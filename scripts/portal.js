'use strict'

function Portal (sites) {
  this.el = document.createElement('div')
  this.el.id = 'portal'
  this.sites = sites

  // Templates

  const _readme = '<p class="readme">This webring is an attempt to inspire artists & developers to build their own website and share traffic among each other. The ring welcomes personalized websites such as <b>diaries, wikis & portfolios</b>.</p><p>To add yourself to the ring, submit a <a href="https://github.com/XXIIVV/webring/edit/master/scripts/sites.js" target="_blank">Pull Request</a>.<br />If you found a broken link, please <a href="https://github.com/XXIIVV/webring/issues/new" target="_blank">report it</a>.</p>'
  const _buttons = '<p class="buttons"><a href="#random" onClick="portal.reload()">Random</a> | <a href="https://github.com/XXIIVV/webring">Information</a> <a id="icon" href="#random" onClick="portal.reload()"></a> | <a href="hallway.html">The Hallway</a> | <a href="wiki.html">The Wiki</a> | <a id="opml">OPML</a></p>'

  function _directory (sites) {
    const siteTypesArray = [...new Set(sites.map(site => site.type).filter(Boolean))]
    const siteLangsArray = [...new Set(sites
      .reduce((flattened, site) => flattened.concat(site.langs), [])
      .sort())]

    const siteTypes = siteTypesArray.reduce((output, siteType) =>
      `${output}<a data-type="${siteType}" href="#" onclick="filterSites(event)">&lt;${siteType}&gt;</a>`,
      '<a class="currentType" data-type="all" href="#" onclick="filterSites(event)">&lt;all&gt;</a>')

    const siteLangs = siteLangsArray.reduce((output, siteLang) =>
      `${output}<a data-lang="${siteLang}" href="#" onclick="filterSites(event)">&lt;${siteLang}&gt;</a>`,
      '<a class="currentLang" data-lang="all" href="#" onclick="filterSites(event)">&lt;all&gt;</a>')

    const listItems = sites.reduce((acc, site, id) =>
      `${acc}<li ${_type(site)} ${_lang(site)} id='${id}'><a href='${site.url}'>${_name(site)}</a></li>`, '')
    return `<nav>${siteTypes}</nav><nav>${siteLangs}</nav><main><ul>${listItems}</ul></main><footer>${_readme}${_buttons}</footer>`
  }

  function _name (site) {
    return site.title || `${site.url.split('//')[1]}`
  }

  function _type (site) {
    return site.type ? `data-type="${site.type} "` : ''
  }

  function _lang (site) {
    return `data-lang="${site.langs.join(' ').trim()}"`
  }

  function _redirectView (site) {
    return `<main><p>Redirecting to <a href="${site.url}">${site.url}</a></p></main>
      <footer><p class='buttons'><a href='#' onClick="portal.reload('')">Directory</a> | <a href='#${site.url}' onClick="portal.reload()">Skip</a> | <a href='#random' onClick="portal.reload()">Random</a> | <a href='https://github.com/XXIIVV/webring'>Information</a> <a id='icon'  href='#random' onClick="portal.reload()"></a></p>`
  }

  //

  this.install = function (host) {
    host.appendChild(this.el)
  }

  this.start = function () {
    if (window.location.hash && window.location.hash.length > 4) {
      const site = this.next()
      this.el.innerHTML = _redirectView(site)
      setTimeout(() => { window.location = site.url }, 3000)
    } else {
      this.el.innerHTML = _directory(this.sites)
    }
  }

  this.reload = function () {
    setTimeout(() => { window.location.reload() }, 500)
  }

  this.navigate = function (target) {
    setTimeout(() => { window.location.href = target }, 3000)
  }

  this.sitesMatchingLangs = this.sites
    .filter(site => site.langs && site.langs.some(lang => navigator.languages.includes(lang)))

  this.next = function () {
    const hash = window.location.hash.replace('#', '').trim()

    if (hash === 'random') {
      return this.sitesMatchingLangs[Math.floor(Math.random() * this.sitesMatchingLangs.length)]
    } else {
      return sites.find(site => site.url.includes(hash))
        ? sites.find(site => site.url.includes(hash))
        : this.sitesMatchingLangs[Math.floor(Math.random() * this.sitesMatchingLangs.length)]
    }
  }
}

function filterSites (e) {
  e.preventDefault()
  const navLink = e.target
  const currentFilter = navLink.dataset.lang ? 'Lang' : 'Type'

  document.querySelector(`nav a.current${currentFilter}`).classList.remove(`current${currentFilter}`)
  navLink.classList.add(`current${currentFilter}`)

  const typeFilter = document.querySelector('nav a.currentType').dataset.type
  const langFilter = document.querySelector('nav a.currentLang').dataset.lang

  const sites = document.querySelectorAll('main li')
  sites.forEach(el => { el.style.display = 'block' })

  sites.forEach(el => {
    if (typeFilter !== 'all') {
      if (el.dataset.type) {
        if (el.dataset.type.trim() !== typeFilter) el.style.display = 'none'
      } else {
        el.style.display = 'none'
      }
    }

    if (langFilter !== 'all') {
      if (!el.dataset.lang.includes(langFilter)) el.style.display = 'none'
    }
  })
}
