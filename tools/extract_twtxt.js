'use strict'

// extract twtxt feeds from sites.js

const fs = require('fs')
const sites = require('../scripts/sites.js')
const record = { following: {} }

for (const site of sites) {
  if (!site.author || !site.feed) { continue }
  record.following[site.author] = site.feed
}

const json = JSON.stringify(record)

fs.writeFile('twtxt.json', json, 'utf8', (err) => {
  if (err) {
    console.log('An error occured while writing JSON Object to File.')
    return console.log(err)
  }
  console.log('Done.')
})
