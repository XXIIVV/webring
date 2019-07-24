'use strict'

const re_channel = /(\s|^)\/([a-zA-Z0-9]+)/g
const re_user = /((\s|^)@&lt;[a-zA-Z0-9./:\-_\+~#= ]*&gt;)/g
const re_tag = /([^&]|^)\#([a-zA-Z0-9]+)/g
const re_url = /((https?):\/\/(([-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b)([-a-zA-Z0-9@:%_\+.~#?&//=]*)))/g

function Hallway (sites) {
  const feeds = {}
  this.sites = sites
  this.el = document.createElement('div')
  this.el.id = 'hallway'
  const filterAndPage = window.location.hash.split('^')
  this.finder = { filter: filterAndPage[0].trim().replace('#', ''), page: filterAndPage[1] || 1 }
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
    const channels = this.find(entries, 'channel')
    const users = this.find(entries, 'author')
    const tags = this.findTags(entries)
    const relevantEntries = entries.filter(val => !this.finder.filter || (val.author === this.finder.filter || val.channel === this.finder.filter || val.tags.includes(this.finder.filter)))

    this.el.innerHTML = `
    <div id='entries'>
      <ul>
        ${entries.filter((val) => !this.finder.filter || (val.author === this.finder.filter || val.channel === this.finder.filter || val.tags.includes(this.finder.filter))).filter((_, id) => id < Number(this.finder.page) * 20 && id >= (Number(this.finder.page) - 1) * 20).reduce((acc, val) => acc + this.templateEntry(val) + '\n', '')}
      </ul>
      <div id='pagination'>
        ${[...Array(Math.ceil(relevantEntries.length / 20)).keys()].reduce((acc, num) => `${acc}<span class='${Number(hallway.finder.page) === num + 1 ? 'selected' : ''}' onclick='filter("${this.finder.filter}^${num + 1}")'>${num + 1}</span>`, '')}
      </div>
    </div>
    <a id='showbar' onclick="toggleVisibility('sidebar');"></a>
    <div id='sidebar'>
      <a id='hidebar' onclick="toggleVisibility('sidebar');"></a>
      <ul id='channels'>
        <li onclick='filter("")' class='${hallway.finder.filter === '' ? 'selected' : ''}'><a href='#'>hallway <span class='right'>${entries.length}</span></a></li>
        ${Object.keys(channels).slice(0, 15).reduce((acc, val) => acc + `<li onclick='filter("${val}")' class='${hallway.finder.filter === val ? 'selected' : ''}'><a href='#${val}'>${val} <span class='right'>${channels[val]}</span></a></li>\n`, '')}
      </ul>
      <ul id='users'>
        ${Object.keys(users).slice(0, 15).reduce((acc, val) => acc + `<li onclick='filter("${val}")' class='${hallway.finder.filter === val ? 'selected' : ''}' href='#${val}'>${val} <span class='right'>${users[val]}</span></li>\n`, '')}
      </ul>
      <ul id='tags'>
        ${Object.keys(tags).slice(0, 15).reduce((acc, val) => acc + `<li onclick='filter("${val}")' class='${hallway.finder.filter === val ? 'selected' : ''}' href='#${val}'>#${val} <span class='right'>${tags[val]}</span></li>\n`, '')}
      </ul>
    </div>
    <p>The <b>Hallway</b> is a decentralized forum, to join the conversation, simply create yourself a <a href="https://twtxt.readthedocs.io/en/stable/user/twtxtfile.html">twtxt</a> feed and <a href="https://github.com/XXIIVV/Webring/">add it</a> to your entry in the <a href="index.html">webring</a>.</p>`

    if (feeds) {
      this.cache = feeds
    }
  }

  // Entries

  this.find = function (entries, p) {
    const h = {}
    for (const id in entries) {
      if (entries[id] && entries[id][p]) { h[entries[id][p]] = h[entries[id][p]] ? h[entries[id][p]] + 1 : 1 }
    }
    return h
  }

  this.findTags = function (entries) {
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
    return a.sort((a, b) => a.offset - b.offset)
  }

  this.findMention = function (found) {
    const mention = Object.keys(feeds).filter(user => found.indexOf(feeds[user].path) > -1)
    return mention.length === 1 ? ` <span class='user'>@${mention[0]}</span>` : ` <span class='user'>${found}</span>`
  }

  this.templateEntry = function (entry) {
    entry.html = entry.body
      .replace(re_channel, `$1<span class='channel'>/$2</span>`)
      .replace(re_user, this.findMention)
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
    for (const site of sites) {
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
    const lines = feed.split('\n').filter((line) => line.substr(0, 1) !== '#')
    const entries = []
    for (const id in lines) {
      const line = lines[id].trim()
      if (line === '') { continue }
      const parts = line.replace('   ', '\t').split('\t')
      const date = parts[0].trim()
      const body = escapeHtml(parts[1].trim()).trim()
      const channel = body.substr(0, 1) === '/' ? body.split(' ')[0].substr(1).toLowerCase() : body.substr(0, 1) === '@' ? 'veranda' : 'lobby'
      const tags = (body.match(re_tag) || []).map(a => a.substr(a.indexOf('#') + 1).toLowerCase())
      const offset = new Date() - new Date(date)
      entries.push({ date, body, author, offset, channel, tags })
    }
    return entries
  }

  function timeAgo (dateParam) {
    const date = typeof dateParam === 'object' ? dateParam : new Date(dateParam)
    const today = new Date()
    const yesterday = new Date(today - 86400000)
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
}

function toggleVisibility (id) {
       var e = document.getElementById(id);
       if(e.style.display == 'block')
          e.style.display = 'none';
       else
          e.style.display = 'block';
    }

function escapeHtml (unsafe) {
  return unsafe.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;')
}

function filter (name) {
  window.location.hash = name
  const filterAndPage = window.location.hash.split('^')
  hallway.finder = { filter: filterAndPage[0].trim().replace('#', ''), page: filterAndPage[1] || 1 }
  hallway.refresh()
}
