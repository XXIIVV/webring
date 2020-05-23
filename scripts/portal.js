'use strict'

function Portal (sites) {
  this.el = document.createElement('div')
  this.el.id = 'portal'
  this.sites = sites

  // Templates

  const _readme = '<p class="readme">This is a list of privacy-friendly software products. Products that respect people&#39;s data.</p><p>To add your product, submit an <a href="https://github.com/yourcontact/list/issues/new/choose" target="_blank">Issue</a>.<br />If you found a broken link, please <a href="https://github.com/yourcontact/list/issues/new" target="_blank">report it</a>.</p>'
  const _buttons = '<p class="buttons"> <a href="/manifesto.html">Manifesto</a> | <a href="#random" onClick="portal.reload()">Random</a>  |  <a href="https://github.com/yourcontact/list">Information</a> |  <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA 4.0</a> <a id="icon" href="https://webring.xxiivv.com/#random"></a> </p>'

  function _directory (sites) {
    const siteTypesArray = [...new Set(sites.map(site => site.type).filter(Boolean))]
    const siteLangsArray = [...new Set(sites
      .reduce((flattened, site) => flattened.concat(site.langs), [])
      .sort())]

    const siteTypes = siteTypesArray.reduce((output, siteType) =>
      `${output}<a data-type="${siteType}" href="#" onclick="filterSites(event)">&lt;${siteType}&gt;</a>`,
    '<a class="currentType" data-type="all" href="#" onclick="filterSites(event)">&lt;all&gt;</a>')

    const siteLangs = siteLangsArray.reduce((output, siteLang) =>
      `${output}<a data-lang="${siteLang}" href="#" onclick="filterSites(event)"></a>`, // >&lt;${siteLang}&gt;</a>`
    '<a class="currentLang" data-lang="all" href="#" onclick="filterSites(event)"></a>') // >&lt;all&gt;</a>'

    const listItems = sites.reduce((acc, site, id) =>
      `${acc}<li ${_type(site)} ${_lang(site)} id='${id}'><a href='${site.url}'>${_name(site)}</a></li>`, '')
    return `<nav>${siteTypes}</nav><nav>${siteLangs}</nav><main><ul>${listItems}</ul></main><footer>${_readme}${_buttons}</footer>`
  }

  function _name (site) {
    return site.title || `${site.url.split('//')[1].replace(/\/+$/, '')}`
  }

  function _type (site) {
    return site.type ? `data-type="${site.type}"` : ''
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
    const hash = window.location.hash
    if (hash && hash.length > 4) {
      const site = this.getSite(hash.replace('#', '').trim())
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

  this.navLangs = [...new Set(navigator.languages.map(lang => lang.split('-').shift()))]

  this.sitesMatchingLangs = this.sites
    .filter(site => site.langs && site.langs.some(lang => this.navLangs.includes(lang)))

  this.nextSiteIndex = (ceiling, index) => index === ceiling ? 0 : index + 1
  this.randomSite = this.sitesMatchingLangs[Math.floor(Math.random() * this.sitesMatchingLangs.length)]

  this.getSite = function (hash) {
    if (hash === 'random') {
      return this.randomSite
    } else {
      const index = this.sitesMatchingLangs.findIndex(site => site.url.includes(hash))
      return (index > -1)
        ? this.sitesMatchingLangs[this.nextSiteIndex(this.sitesMatchingLangs.length, index)]
        : this.randomSite
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
