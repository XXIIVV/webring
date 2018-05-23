'use strict'

function add_leading_zeros(n, N)
{
  const diff = N.toString().length - n.toString().length
  return diff > 0
              ? '0'.repeat( diff ) + n
              : n
}


function Portal(sites)
{
  this.el = document.querySelector('main')
  this.sites = sites

  this.start = function()
  {
    this.el.innerHTML =
      window.location.hash && ( window.location.hash.length > 4 )
        ? this.redirect()
        : this.directory()
  }

  this.directory = function()
  {
    const ln_arr =
      this.sites.map( ( site, id, arr ) => `
<ln>${ add_leading_zeros(id, arr.length) })
  <a href='${site}'>
    ${site.replace( /^(dat|https?):\/\/(www\.)?/ , '' )}
  </a>
</ln> `)

    return `
<list>${ln_arr.join('\n')}</list>
<a href='#random' onClick='portal.reload("random")'>Random</a>
| <a href='https://github.com/XXIIVV/webring'>Information</a>
<a id='icon' href='#random' onClick='portal.reload("random")'></a>
      `
  }

  this.reload = function(hash)
  {
    if(hash){
      window.location.hash = hash
    }
    setTimeout( ()=> {
      window.location.reload()
    },500)
  }

  this.navigate = function(target)
  {
    setTimeout(() => {
      window.location.href = target
    },3000)
  }

  this.location = function()
  {
    return window.location.hash
                 .replace( /^#/, '' )
                 .trim()
  }

  this.locate = function()
  {
    const hash = this.location()

    if(hash == 'random'){
      return Math.floor(Math.random()*this.sites.length)
    }

    const found_sites = this.sites
      .filter( s => (s.indexOf(hash) > -1)
                 || (hash.indexOf(s) > -1 ) )

    if(found_sites.length && found_sites[0]){
      return this.sites.indexOf(found_sites[0])
    }

    return -1
  }

  this.next = function(loc)
  {
    return loc > this.sites.length-2
         ? this.sites[0]
         : this.sites[loc+1]
  }

  this.redirect = function()
  {
    const location = this.locate()
        , target = this.next(location)

    this.navigate(target)

    return `
<meta http-equiv='refresh' content='3; url=${target}'>
<p>Redirecting to <b>${target}</b></p>
<a href='#' onClick='portal.reload()'>Directory</a>
| <a href='#${target}' onClick='portal.reload("random")'>Skip</a>
| <a href='#random' onClick='portal.reload("random")'>Random</a>
| <a href='https://github.com/XXIIVV/webring'>Information</a>
<a id='icon' href='#random' onClick='portal.reload("random")'></a>
      `
  }
}
