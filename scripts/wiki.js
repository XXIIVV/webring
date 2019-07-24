// Wikis

parseGlossary = function (text) {
  return Promise.resolve(text)
}

loadGlossary = function (wikiUrl) {
  return fetch(wikiUrl).then(resp => {
    const content = resp.headers.get('content-type').split(';')[0]
    switch (content) {
      case 'text/html':
        return resp.text().then(text => {
          const glossaryURL = new DOMParser()
            .parseFromString(text, 'text/html')
            .querySelector('link[rel=glossary]')
            .getAttribute('href')
          return fetch(`${wikiUrl}/${glossaryURL}`)
            .then(x => x.text())
            .then(parseGlossary)
        }).catch(err => {
          console.warn(`Could not fetch glossary at ${wikiUrl}: ${err}`)
        })
      default:
        return resp.text().then(parseGlossary)
    }
  })
}

window.onload = function () {
  let a = document.getElementById('wiki')
  let wikis = portal.sites.filter(site => site.wiki)
  let {wiki} = wikis[Math.floor(Math.random() * wikis.length)]
  loadGlossary(wiki).then(
    glossary => a.title = glossary
  )
}