let outlines = sites.filter((site) => !!site.rss).map((site) => {
  return `<outline type="rss" xmlUrl="${site.rss}" title="${site.title}"/>`
})

let template = `<?xml version="1.0" encoding="UTF-8"?><opml version="1.1"><head></head><body>${outlines.join('')}</body></opml>`

window.onload = function () {
  let a = document.getElementById('opml')
  a.setAttribute('href', 'data:text/plain;charset=utf-8,' + window.encodeURIComponent(template))
  a.setAttribute('download', 'webring.opml')
}
