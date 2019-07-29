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
  this._entry = document.createElement('div')
  this._entry.id = 'entry'

  this.loc = ''
  this.index = {}
  this.categories = {}

  this.install = (host) => {
    console.log('Wiki', 'Installing..')
    this.fetch()
    this._el.appendChild(this._entry)
    this._sidebar.appendChild(this._categories)
    this._el.appendChild(this._sidebar)
    host.appendChild(this._el)
  }

  this.start = () => {
    console.log('Wiki', 'Starting..')
    this.loc = window.location.hash.substr(1).replace(/\+/g, ' ').toUpperCase()
    this._entry.innerHTML = 'Loading..'
  }

  this.refresh = () => {
    console.log(Object.keys(this.index).length + ' terms')
    // Main
    if (this.loc) {
      if (this.categories[this.index]) {
        let html = `term: ${this.loc}`
        this._entry.innerHTML = html
      } else if (this.categories[this.loc]) {
        let html = ''
        for (const id in this.categories[this.loc]) {
          const name = this.categories[this.loc][id].name
          html += `${this.templateTerm(name, this.index[name])}<br />`
        }
        this._entry.innerHTML = html
      } else {
        let html = `Unknown: ${this.loc}. Retun <a onclick='wiki.go("")'>home</a>, or try a <a onclick='wiki.go("${this.random()}")'>random page</a>.`
        this._entry.innerHTML = html
      }
    } else {
      const random = this.random()
      this._entry.innerHTML = `Click a /topic to get started, or try a <a href='#${random.toUrl()}' onclick='wiki.go("${random}")'>random page</a>.`
    }
    // Sidebar
    this._categories.innerHTML = Object.keys(this.categories).reduce((acc, id) => { return this.categories[id].length > 5 ? `${acc}<li onclick='wiki.go("${id}")' class='${wiki.at(id) ? 'selected' : ''}'>${id.substr(0, 20)} <span class='right'>${this.categories[id].length}</span></li>` : acc }, '')
    this._entry.innerHTML += `<p id='footer'>The <b>Wiki</b> is a decentralized encyclopedia, to join the conversation, simply create yourself an <a href="https://wiki.xxiivv.com/Indental">twtxt</a> feed and <a href="https://github.com/XXIIVV/Webring/">add it</a> to your entry in the <a href="index.html">webring</a>.</p>`
  }

  this.go = (q = this.loc) => {
    this.loc = q
    window.location.hash = q.toUrl()
    this.refresh()
  }

  this.at = (q = '') => {
    return this.loc.toUpperCase() === q.toUpperCase()
  }

  this.random = () => {
    const keys = Object.keys(this.categories)
    const target = Math.floor(Math.random() * keys.length)
    return keys[target]
  }

  this.templateTerm = (name, entry) => {
    return '<ul class="term"><li class="name"><b>' + name.toLowerCase() + '</b></li>' + entry.reduce((acc, item) => { return `${acc}<li>${item.value} <a class='author' target='_blank' href='${item.origin.url}'> — @${item.origin.author}</a></li>` }, '') + '</ul>'
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
    this.index[name].push({ name, value, cat, origin })
    if (!this.categories[cat]) {
      this.categories[cat] = []
    }
    this.categories[cat].push({ name, value, cat, origin })
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
  String.prototype.toUrl = function () { return this.toLowerCase().replace(/ /g, '+').replace(/[^0-9a-z\+\:\-\.\/\~]/gi, '').trim() }
}
