'use strict'

function Portal (sites) {
  this.el = document.createElement('div')
  this.el.id = 'portal'
  this.sites = sites

  // Templates

  function _readme () {
    return `<p class='readme'>This webring is an attempt to inspire artists & developers to build their own website and share traffic among each other. The ring welcomes personalized websites such as <b>diaries, wikis & portfolios</b>.</p><p>To add yourself to the ring, submit a <a href='https://github.com/XXIIVV/webring/edit/master/scripts/sites.js' target='_blank'>Pull Request</a>.<br />If you found a broken link, please <a href='https://github.com/XXIIVV/webring/issues/new' target='_blank'>report it</a>.</p>`
  }

  function _buttons () {
    return `<p class='buttons'><a href='#random' onClick="portal.reload('random')">Random</a> | <a href='https://github.com/XXIIVV/webring'>Information</a> <a id='icon' href='#random' onClick="portal.reload('random')"></a> | <a href="hallway.html">The Hallway</a> | <a href="wiki.html">The Wiki</a> | <a id="opml">OPML</a></p>`
  }

  function _directory (sites) {
    const siteTypesArray = [...new Set(sites.map(site => site.type).filter(Boolean))]
    const siteTypes = siteTypesArray.reduce((output, siteType) =>
      `${output}<a data-type='${siteType}' href='#' onclick='toggleType(event)'>&lt;${siteType}&gt;</a>`,
      `<a class='current' href='#' onclick='toggleType(event)'>&lt;all&gt;</a>`)
    const listItems = sites.reduce((acc, site, id) =>
      `${acc}<li ${_type(site)} id='${id}'><a href='${site.url}'>${_name(site)}</a></li>`, '')
    return `<nav>${siteTypes}</nav><main><ul>${listItems}</ul></main><footer>${_readme()}${_buttons()}</footer>`
  }

  function _name (site) {
    return site.title || `${site.url.split('//')[1]}`
  }

  function _type (site) {
    return site.type ? `data-type="${site.type}"` : ''
  }

  function _redirect (site) {
    return `<main><p>Redirecting to <a href="${site.url}">${site.url}</a></p></main>
      <meta http-equiv="refresh" content="3; url=${site.url}">
      <footer><p class='buttons'><a href='#' onClick="portal.reload('')">Directory</a> | <a href='#${site.url}' onClick="portal.reload('random')">Skip</a> | <a href='#random' onClick="portal.reload('random')">Random</a> | <a href='https://github.com/XXIIVV/webring'>Information</a> <a id='icon'  href='#random' onClick="portal.reload('random')"></a></p>`
  }

  //

  this.install = function (host) {
    host.appendChild(this.el)
  }

  this.start = function () {
    this.el.innerHTML = window.location.hash && window.location.hash.length > 4 ? _redirect(this.next()) : _directory(this.sites)
  }

  this.reload = function () {
    setTimeout(() => { window.location.reload() }, 500)
  }

  this.navigate = function (target) {
    setTimeout(() => { window.location.href = target }, 3000)
  }

  this.locate = function () {
    const hash = window.location.hash.replace('#', '').trim()

    if (hash === 'random') {
      return Math.floor(Math.random() * this.sites.length)
    } else {
      const id = sites.findIndex(site => site.url.indexOf(hash) > -1)
      return id > -1 ? parseInt(id) : -1
    }
  }

  this.next = function (loc = this.locate()) {
    return loc == this.sites.length - 1 ? this.sites[0] : this.sites[loc + 1]
  }

}

function toggleType (e) {
  e.preventDefault()
  const navLink = e.target
  const selectedType = navLink.dataset.type
  document.querySelector(`nav a.current`).classList.remove('current')
  navLink.classList.add('current')
  document.querySelectorAll(`main li`).forEach(el => el.style.display = 'block')
  if(selectedType) {
    document.querySelectorAll(`main li:not([data-type='${selectedType}'])`).forEach(el => el.style.display = 'none')
  }
}
