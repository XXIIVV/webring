'use strict'

function indental (data, Type) {
  function formatLine (line) {
    const a = []
    const h = {}
    for (const child of line.children) {
      if (child.key) {
        if (h[child.key]) { console.warn(`Redefined key: ${child.key}.`) }
        h[child.key] = child.value
      } else if (child.children.length === 0 && child.content) {
        a[a.length] = child.content
      } else {
        h[child.content.toUpperCase()] = formatLine(child)
      }
    }
    return a.length > 0 ? a : h
  }

  function makeLine (line) {
    return line.indexOf(' : ') > -1 ? {
      indent: line.search(/\S|$/),
      content: line.trim(),
      key: line.split(' : ')[0].trim().toUpperCase(),
      value: line.split(' : ')[1].trim()
    } : {
      indent: line.search(/\S|$/),
      content: line.trim(),
      children: []
    }
  }

  function skipLine (line) {
    return line.trim() !== '' && line.substr(0, 1) !== ';' && line.trim().slice(-1) !== '`'
  }

  const lines = data.split('\n').filter(skipLine).map(makeLine)

  // Assoc
  const stack = {}
  for (const line of lines) {
    const target = stack[line.indent - 2]
    if (target) { target.children.push(line) }
    stack[line.indent] = line
  }

  // Format
  const h = {}
  for (const id in lines) {
    const line = lines[id]
    if (line.indent > 0) { continue }
    const key = line.content.toUpperCase()
    if (h[key]) { console.warn(`Redefined key: ${key}, line ${id}.`) }
    h[key] = Type ? new Type(key, formatLine(line)) : formatLine(line)
  }
  return h
}

module.exports = indental
