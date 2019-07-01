'use strict'

function Hallway (sites) {
  const feeds = {}
  this.sites = sites
  this.el = document.createElement('div')

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
    console.log('!!')
  }

  //

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
    Promise.all([ fetch(feed.path).then(x => x.text()) ]).then(([content]) => {
      feeds[id].content = content
      this.refresh()
    })
  }
}
