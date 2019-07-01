'use strict'

function Hallway (sites) {
  this.sites = sites
  this.el = document.createElement('div')

  this.install = function (host) {
    host.appendChild(this.el)
  }

  this.start = function () {
    this.el.innerHTML = 'hello'
    this.fetch('https://wiki.xxiivv.com/twtxt.txt')
  }

  this.fetch = function (location) {
    Promise.all([ fetch(location).then(x => x.text()) ]).then(([sampleResp]) => {
      console.log(sampleResp)
    })
  }
}
