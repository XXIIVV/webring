'use strict'

const re_channel = /(\s|^)\/([a-zA-Z0-9]+)/g
const re_user = /(\s|^)\@([a-zA-Z0-9]+)/g
const re_tag = /([^&]|^)\#([a-zA-Z0-9]+)/g
const re_url = /((https?):\/\/(([-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b)([-a-zA-Z0-9@:%_\+.~#?&//=]*)))/g

function Hallway (sites) {
  const feeds = {}
  this.sites = sites
  this.el = document.createElement('div')
  this.el.id = 'hallway'
  this.filter = window.location.hash.replace('#', '').trim()
  this.cache = null

  this.install = function (host) {
    host.appendChild(this.el)
    this.findFeeds()
  }

  this.start = function () {
    this.el.innerHTML = 'hello.'
    this.fetchFeeds()
  }

  this.refresh = function (feeds = this.cache) {
    const entries = this.findEntries(feeds)
    const channels = this.findChannels(entries)
    const users = this.findUsers(entries)
    const tags = this.findTags(entries)

    this.el.innerHTML = `
    <ul id='entries'>
      ${entries.filter((val, id) => { return !this.filter || (val.author === this.filter || val.channel === this.filter || val.tags.includes(this.filter)) }).filter((val, id) => { return id < 50 }).reduce((acc, val, id) => { return acc + this.templateEntry(val) + '\n' }, '')}
    </ul>
    <div id='sidebar'>
      <ul id='channels'>
        <li onclick='filter("")' class='${hallway.filter === '' ? 'selected' : ''}'><a href='#'>hallway <span class='right'>${entries.length}</span></a></li>
        ${Object.keys(channels).reduce((acc, val, id) => { return acc + `<li onclick='filter("${val}")' class='${hallway.filter === val ? 'selected' : ''}'><a href='#${val}'>${val} <span class='right'>${channels[val]}</span></a></li>\n` }, '')}
      </ul>
      <ul id='users'>
        ${Object.keys(users).reduce((acc, val, id) => { return acc + `<li onclick='filter("${val}")' class='${hallway.filter === val ? 'selected' : ''}' href='#${val}'>${val} <span class='right'>${users[val]}</span></li>\n` }, '')}
      </ul>
      <ul id='tags'>
        ${Object.keys(tags).reduce((acc, val, id) => { return acc + `<li onclick='filter("${val}")' class='${hallway.filter === val ? 'selected' : ''}' href='#${val}'>#${val} <span class='right'>${tags[val]}</span></li>\n` }, '')}
      </ul>
    </div>
    <p>The <b>Hallway</b> is a decentralized forum, to join the conversation, simply create yourself a <a href="https://twtxt.readthedocs.io/en/stable/user/twtxtfile.html">twtxt</a> feed and <a href="https://github.com/XXIIVV/Webring/">add it</a> to your entry in the <a href="index.html">webring</a>.</p>`

    if (feeds) {
      this.cache = feeds
    }
  }

  // Entries

  this.findChannels = function (entries) {
    const channels = {}
    for (const id in entries) {
      const entry = entries[id]
      if (!entry.channel) { continue }
      channels[entry.channel] = channels[entry.channel] ? channels[entry.channel] + 1 : 1
    }
    return channels
  }

  this.findUsers = function (entries) {
    const users = {}
    for (const id in entries) {
      const entry = entries[id]
      users[entry.author] = users[entry.author] ? users[entry.author] + 1 : 1
    }
    return users
  }
  
  this.findTags = function (entries){
    const tags = {}
    for (const id in entries) {
      const entry = entries[id]
      entry.tags.map(tag => {
        tags[tag] = tags[tag] ? tags[tag] + 1 : 1
      })
    }
    return tags
  }

  this.findEntries = function (feeds) {
    const a = []
    for (const id in feeds) {
      for (const i in feeds[id].content) {
        a.push(feeds[id].content[i])
      }
    }
    return a.sort( (a, b) => a.offset - b.offset )
  }

  this.templateEntry = function (entry) {
    entry.html = entry.body
      .replace(re_channel, `$1<span class='channel'>/$2</span>`)
      .replace(re_user, `$1<span class='user'>@$2</span>`)
      .replace(re_tag, `$1<span class='tag'>#$2</span>`)
      .replace(re_url, `<a target="_blank" href='$1'>$1</a>`)
    
    const filter = window.location.hash.substr(1).replace(/\+/g, ' ').toLowerCase()
    const highlight = filter === entry.author.toLowerCase()
    const origin = feeds[entry.author].path

    return `<li class='entry ${highlight ? 'highlight' : ''}'><span class='date'>${timeAgo(Date.parse(entry.date))}</span> <a class='author' href='${origin}' target='_blank'>${entry.author}</a> <span class='body'>${entry.html}</span></li>`
  }
  
  // Feeds

  this.findFeeds = function () {
    console.log('Finding feeds..')
    for (const id in sites) {
      const site = sites[id]
      if (site.feed && site.author) {
        feeds[site.author] = { path: site.feed }
      }
    }
    console.log(`Found ${Object.keys(feeds).length} feeds.`)
  }

  this.fetchFeeds = function () {
    console.log(`Fetching ${Object.keys(feeds).length} feeds..`)
    for (const id in feeds) {
      this.fetchFeed(id, feeds[id])
    }
  }

  this.fetchFeed = function (id, feed) {
    console.log(`Fetching ${id}(${feed.path})..`)
    fetch(feed.path, { cache: 'no-store' }).then(x => x.text()).then((content) => {
      feeds[id].content = parseFeed(id, content)
      this.refresh(feeds)
    }).catch((err) => {
      console.warn(`${id}`, err)
    })
  }

  // Utils

  function parseFeed (author, feed) {
    const lines = feed.split('\n')
    const entries = []
    for (const id in lines) {
      const line = lines[id].trim()
      if (line === '') { continue }
      const parts = line.replace('   ', '\t').split('\t')
      const date = parts[0].trim()
      const body = escapeHtml(parts[1].trim()).trim()
      const channel = body.substr(0, 1) === '/' ? body.split(' ')[0].substr(1).toLowerCase() : body.substr(0, 1) === '@' ? 'veranda' : 'lobby'
      const tags = (body.match(re_tag)||[]).map(a => a.substr(a.indexOf('#')+1).toLowerCase())
      const offset = new Date() - new Date(date)
      entries.push({ date, body, author, offset, channel, tags })
    }
    return entries
  }

  function timeAgo (dateParam) {
    const date = typeof dateParam === 'object' ? dateParam : new Date(dateParam)
    const DAY_IN_MS = 86400000 // 24 * 60 * 60 * 1000
    const today = new Date()
    const yesterday = new Date(today - DAY_IN_MS)
    const seconds = Math.round((today - date) / 1000)
    const minutes = Math.round(seconds / 60)
    const isToday = today.toDateString() === date.toDateString()
    const isYesterday = yesterday.toDateString() === date.toDateString()

    if (seconds < 5) {
      return 'just now'
    } else if (seconds < 60) {
      return `${seconds} seconds ago`
    } else if (seconds < 90) {
      return 'a minute ago'
    } else if (minutes < 60) {
      return `${minutes} minutes ago`
    } else if (isToday) {
      return `${Math.floor(minutes / 60)} hours ago`
    } else if (isYesterday) {
      return 'yesterday'
    }

    return `${Math.floor(minutes / 1440)} days ago`
  }

  function escapeHtml (unsafe) {
    return unsafe.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;')
  }
}

function filter (name) {
  window.location.hash = name
  hallway.filter = window.location.hash.replace('#', '').trim()
  hallway.refresh()
}
