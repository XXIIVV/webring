'use strict'

function Hallway (sites) {
  const feeds = {}
  this.sites = sites
  this.el = document.createElement('div')
  this.el.id = 'hallway'

  this.install = function (host) {
    host.appendChild(this.el)
    this.findFeeds()
  }

  this.start = function () {
    this.el.innerHTML = 'hello'
    this.fetchFeeds()
  }

  this.refresh = function (feeds) {
    const entries = this.findEntries(feeds)
    const channels = this.findChannels(entries)
    const users = this.findUsers(entries)

    let _entries = entries.reduce((acc, val, id) => { return acc + this.templateEntry(val) + '\n' }, '')
    let _channels = Object.keys(channels).reduce((acc, val, id) => { return acc + `<li>${val} <span class='right'>${channels[val]}</span></li>\n` }, '')
    let _users = Object.keys(users).reduce((acc, val, id) => { return acc + `<li>${val} <span class='right'>${users[val]}</span></li>\n` }, '')

    this.el.innerHTML = `
    <ul id='entries'>
      ${_entries}
    </ul>
    <div id='sidebar'>
      <ul id='channels'>
        ${_channels}
      </ul>
      <ul id='users'>
        ${_users}
      </ul>
    </div>
    ${this._footer()}`
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

  this.findEntries = function (feeds) {
    const a = []
    for (const id in feeds) {
      const feed = feeds[id]
      for (const i in feed.content) {
        const entry = feed.content[i]
        a.push(entry)
      }
    }
    return a.sort(compare)
  }

  this.templateEntry = function (entry) {
    // Find mention
    if (entry.body.indexOf('@<') > -1) {
      const data = entry.body.split('@<').pop().split('>')[0]
      const mention = data.split(' ')
      const name = mention[0]
      const path = mention[1]
      entry.body = entry.body.replace(`@<${data}>`, `<a href='${path}'>@${name}</a>`)
    }

    if (entry.body.substr(0, 1) === '/') {
      const channel = entry.body.split(' ')[0]
      entry.body = entry.body.replace(channel, `<span class='channel'>${channel}</span>`)
    }

    const filter = window.location.hash.substr(1).replace(/\+/g, ' ').toLowerCase()
    const highlight = filter == entry.author.toLowerCase()

    return `<li class='entry ${highlight ? 'highlight' : ''}'><span class='date'>${timeAgo(Date.parse(entry.date))}</span> <a class='author' href=''>${entry.author}</a> <span class='body'>${entry.body}</span></li>`
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

  // Extras

  this._footer = function () {
    return '<p>The <b>Hallway</b> is a decentralized forum, to join the conversation, simply create yourself a <a href="https://twtxt.readthedocs.io/en/stable/user/twtxtfile.html">twtxt</a> feed and <a href="https://github.com/XXIIVV/Webring/">add it</a> to your entry in the <a href="index.html">webring</a>.</p>'
  }

  // Utils

  function compare (a, b) {
    return a.offset < b.offset ? -1 : a.offset > b.offset ? 1 : 0
  }

  function parseFeed (author, feed) {
    const lines = feed.split('\n')
    const entries = []
    for (const id in lines) {
      const line = lines[id].trim()
      if (line === '') { continue }
      const parts = line.replace('   ', '\t').split('\t')
      const date = parts[0].trim()
      const body = parts[1].trim()
      const channel = body.substr(0, 1) === '/' ? body.split(' ')[0].substr(1).toLowerCase() : null
      const offset = new Date() - new Date(date)
      entries.push({ date, body, author, offset, channel })
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
      return 'now'
    } else if (seconds < 60) {
      return `${seconds} seconds ago`
    } else if (seconds < 90) {
      return 'about a minute ago'
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
