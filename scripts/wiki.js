'use strict'

function Wiki (sites) {
  const feeds = {}
  this.sites = sites
  this.el = document.createElement('div')
  this.el.id = 'wiki'

  this.install = function (host) {
    console.log('Wiki','Installing..')
    this.fetch()
    host.appendChild(this.el)
  }

  this.start = function () {
    console.log('Wiki','Starting..')
    this.el.innerHTML = 'hello.'
  }

  this.fetch = function () {
    console.log('Wiki','Fetching..')
    for (const site of sites) {
      if(!site.wiki || !site.author){continue}
      console.log(site)
    }
    console.log(`Found ${Object.keys(feeds).length} feeds.`)
  }
}