'use strict'

function Wiki (sites) {
  const feeds = {}
  this.sites = sites
  this._el = document.createElement('div')
  this._el.id = 'wiki'
  this._sidebar = document.createElement('div')
  this._sidebar.id = 'sidebar'
  this._categories = document.createElement('ul')
  this._categories.id = 'categories'
  this._names = document.createElement('div')
  this._names.id = 'names'

  this.index = {}
  this.categories = {}

  this.install = (host) => {
    console.log('Wiki', 'Installing..')
    this.fetch()
    this._el.appendChild(this._names)
    this._sidebar.appendChild(this._categories)
    this._el.appendChild(this._sidebar)
    host.appendChild(this._el)
  }

  this.start = () => {
    console.log('Wiki', 'Starting..')
    // this.el.innerHTML = 'hello.'
  }

  this.refresh = () => {
    console.log(Object.keys(this.index).length + ' terms')

    // Cats

    let html = ''
    for (const id in this.categories) {
      html += `<li>${id} <span class='right'>${this.categories[id].length}</span></li>`
    }
    this._categories.innerHTML = `${html}`
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

  this.add = (name, value, cat, origin) => {
    if (!this.index[name]) {
      this.index[name] = []
    }
    this.index[name].push({ value, cat, origin })
    if (!this.categories[cat]) {
      this.categories[cat] = []
    }
    this.categories[cat].push({ value, cat, origin })
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
