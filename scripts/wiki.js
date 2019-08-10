'use strict'

const Wiki = sites => {
  const entries = {}
  const main = document.getElementById('main')
  const aside = document.getElementById('aside')
  const authors = new Set()
  const terms = new Set()

  const storeEntry = (author, url, parent, cat, entry) => {
    if (!(parent in entries)) {
      entries[parent] = {}
      entries[parent][cat] = [{ entry, author, url }]
    } else if (!(cat in entries[parent])) {
      entries[parent][cat] = [{ entry, author, url }]
    } else {
      entries[parent][cat].push({ entry, author, url })
    }
    terms.add(cat)
    authors.add(author)
  }

  const storeEntries = (author, url, parent, entries) => {
    Array.isArray(entries)
      ? storeEntry(author, url, parent, 'list-definitions', entries)
      : Object.keys(entries).forEach(entry => storeEntry(author, url, parent, entry, entries[entry]))
  }

  const transform = (author, url, ndtl) => {
    Object.keys(ndtl).forEach(cat => storeEntries(author, url, cat, ndtl[cat]))
  }

  const parse = (site, content) => {
    console.log('Wiki', 'Parsing ' + site.wiki)
    const ndtl = indental(content)
    transform(site.author, site.url, ndtl)
  }

  const selected = (key, category) => key.toLowerCase() === category.toLowerCase()
    ? 'selected'
    : ''

  const randomTerm = () => {
    const keys = Object.keys(entries)
    return keys[Math.floor(Math.random() * keys.length)]
  }

  const formatSideBarCat = (key, entries) => (currentHtml, cat) => {
    const catLength = Object.keys(entries[cat]).length
    const newHtml = `<li class='${selected(key, cat)}'}'>
                      <a href='#${cat}' data-msgs='${catLength}'>${cat.toLowerCase()}</a>
                     </li>`
    return `${currentHtml}${newHtml}`
  }

  const formatEntry = (definitions, definition) => {
    const formatEntryList = entryList => entryList.reduce((items, item) => `${items}<li>${item}</li>`, '')

    const newHtml = typeof definition.entry === 'string'
      ? `<li>${definition.entry}
          - <a class='author' target='_blank' href='${definition.url}'> @${definition.author}</a>
        </li>`
      : `<li><ul>${formatEntryList(definition.entry)}
          <a class='author' target='_blank' href='${definition.url}'> — @${definition.author}</a>
        </ul></li>`

    return `${definitions}${newHtml}`
  }

  const formatEntries = entries => (currentHtml, category) => {
    const definitions = entries[category].reduce(formatEntry, '')
    const title = category === 'list-definitions'
      ? ''
      : `<li class='name'><strong>${category.toLowerCase()}</strong></li>`
    return `${currentHtml}<ul class='term'>${title}${definitions}</ul>`
  }

  const findRelated = key => {
    const searchOtherCategories = entry => {
      return Object.keys(entries)
        .filter(category => Object.keys(entries[category]).some(otherCat => otherCat === entry))
    }

    const foundMatches = Object.keys(entries[key])
      .filter(entry => entry !== 'list-definitions')
      .map(searchOtherCategories)
    const flattened = [].concat.apply([], foundMatches)
    return Array.from(new Set(flattened)).filter(related => related !== key)
  }

  const formatRelated = (allRelated, relatedCategory) => {
    const newHtml = `<span><a href='#${relatedCategory}'>/${relatedCategory.toLowerCase()}</a> </span>`
    return `${allRelated}${newHtml}`
  }

  const refresh = key => {
    if (key) {
      if (entries[key] === undefined) return
      const items = Object.keys(entries[key]).sort().reduce(formatEntries(entries[key]), '')
      const relatedCategories = findRelated(key)
      const relatedHtml = relatedCategories.length > 0
        ? relatedCategories.reduce(formatRelated, 'Related categories: ')
        : ''
      main.innerHTML = `<div class='related'><h1>${key}</h1>${relatedHtml}</div>${items}`
    } else {
      const html = `Click a /topic to get started, or try a <a href='#${randomTerm()}'>random page</a>`
      const stats = `The wiki contains ${terms.size} terms in ${Object.keys(entries).length} categories, from ${authors.size} authors.`
      main.innerHTML = `<h1>WIKI</h1>${html}<br />${stats}`
    }

    const homeCat = `<li class='${selected(key, '')}'>
                      <a href='#' data-msgs='${terms.size}'>home</a>
                    </li>`
    const cats = Object.keys(entries).sort().reduce(formatSideBarCat(key, entries), homeCat)
    aside.innerHTML = `<ul>${cats}</ul>`
  }

  return {
    initialize: hash => {
      console.log('Wiki', 'Fetching...')
      sites.filter(site => site.wiki && site.author).forEach(site => {
        fetch(site.wiki, { cache: 'no-store' }).then(x => x.text()).then(content => {
          parse(site, content)
          refresh(stripHash(hash))
        }).catch((err) => {
          console.warn(`${site.wiki}`, err)
        })
      })
    },
    refresh: key => { refresh(key) }
  }
}

const stripHash = hash => {
  const decoded = decodeURIComponent(hash)
  return decoded.charAt(0) === '#' ? decoded.substring(1) : decoded
}

window.addEventListener('hashchange', () => {
  wiki.refresh(stripHash(window.location.hash).toUpperCase())
})
