'use strict'

function Wiki (sites) {
  const feeds = {}
  this.sites = sites
  this.el = document.createElement('div')
  this.el.id = 'wiki'

  this.index = {}

  this.install = (host) => {
    console.log('Wiki', 'Installing..')
    this.fetch()
    host.appendChild(this.el)
  }

  this.start = () => {
    console.log('Wiki', 'Starting..')
    this.el.innerHTML = 'hello.'
  }

  this.fetch = () => {
    console.log('Wiki', 'Fetching..')
    for (const site of sites) {
      if (!site.wiki || !site.author) { continue }
      fetch(site.wiki, { cache: 'no-store' }).then(x => x.text()).then((content) => {
        this.parse(site, content)
        this.refresh(feeds)
      }).catch((err) => {
        console.warn(`${site.wiki}`, err)
      })
    }
  }

  this.refresh = () => {
    console.log(Object.keys(this.index).length + ' terms')
  }

  this.add = (name, value, cat, origin) => {
    if (!this.index[name]) {
      this.index[name] = []
    }
    this.index[name].push({ value, cat, origin })
  }

  this.parse = (site, content) => {
    console.log('Wiki', 'Parsing ' + site.wiki)
    const cats = indental(this.filter(content))
    for (const cat in cats) {
      const terms = cats[cat]
      for (const name in terms) {
        this.add(name, terms[name], cat, site)
      }
    }
  }

  this.filter = (lines) => {
    return lines.split('\n').filter((line) => { return line.indexOf(' = `') < 0 && line.trim().length > 1 }).join('\n')
  }
}
