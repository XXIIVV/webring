'use strict'

function Hallway (sites) {
  const feeds = {}
  this.sites = sites
  this.el = document.createElement('div')
  this.el.id = 'hallway'

  this.install = function (host) {
    host.appendChild(this.el)
    // Find feeds
    this.findFeeds()
  }

  this.start = function () {
    this.el.innerHTML = 'hello'
    this.fetchFeeds()
    // this.fetch('https://wiki.xxiivv.com/twtxt.txt')
  }

  this.refresh = function () {
    const entries = this.sortEntries()
    let html = ''
    for (const id in entries) {
      html += `${this.templateEntry(entries[id])}\n`
    }
    this.el.innerHTML = `<ul>${html}</ul>${this._footer()}`
  }

  // Entries

  this.sortEntries = function () {
    const a = []
    for (const id in feeds) {
      const feed = feeds[id]
      for (const i in feed.content) {
        const entry = feed.content[i]
        a.push(entry)
      }
    }
    return a
  }

  this.templateEntry = function (entry) {
    const now = new Date()
    const then = Date.parse(entry.date)
    const diff = (now - then)
    const date = Math.floor(diff / 86400000)

    return `<li class='entry'><span class='date'>${ago(date)}</span> <span class='author'>${entry.author}</span> <span class='body'>${entry.body}</span></li>`
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
    Promise.all([ fetch(feed.path, { cache: 'no-store' }).then(x => x.text()) ]).then(([content]) => {
      feeds[id].content = parseFeed(id, content)
      this.refresh()
    })
  }

  // Extras

  this._footer = function () {
    return '<p>The <b>Hallway</b> is a decentralized forum, to join the conversation, simply create yourself a <a href="https://twtxt.readthedocs.io/en/stable/user/twtxtfile.html">twtxt</a> feed and add it to your entry in the webring.</p>'
  }

  // Utils

  function parseFeed (author, feed) {
    const lines = feed.split('\n')
    const entries = []
    for (const id in lines) {
      const line = lines[id]
      const date = line.substr(0, 25).trim()
      const body = line.substr(26).trim()
      entries.push({ date, body, author })
    }
    return entries
  }

  function ago (days, cap = 9999) {
    if (-days > cap) { return `${this.toString(true)}` }
    if (days === -1) { return `yesterday` }
    if (days === 1) { return 'tomorrow' }
    if (days === 0) { return 'today' }
    if (days < -365) { return `${Math.floor(days / -365)} years ago` }
    if (days < 1) { return `${days * -1} days ago` }
    return `in ${days} days`
  }
}
