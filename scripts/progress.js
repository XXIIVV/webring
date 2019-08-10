'use strict'

const Progress = keys => {
  const allKeys = new Set(keys.filter(key => key))
  const loadedKeys = new Set()
  const failedKeys = new Set()

  const done = () => loadedKeys.size === allKeys.size

  const className = () => done() ? 'done' : 'busy'

  const formatPercentLoaded = () => `
    ${Math.round(100 * loadedKeys.size / Math.max(allKeys.size, 1))}% loaded
  `

  const formatFailureCount = () => failedKeys.size === 0
    ? ''
    : `(${failedKeys.size} failed)`

  const formatProgress = () => done()
    ? ''
    : `<p><progress value='${loadedKeys.size}' max='${allKeys.size}'></progress></p>`

  const render = () => `
    <div class='${className()}'>
      <p>${formatPercentLoaded()} ${formatFailureCount()}</p>
      ${formatProgress()}
    </div>
  `

  const didLoad = (key, success) => new Promise((resolve, reject) => {
    if (allKeys.has(key)) {
      loadedKeys.add(key)
      if (!success) failedKeys.add(key)
      return resolve()
    } else {
      return reject()
    }
  })

  return {
    success: key => didLoad(key, true),
    failure: key => didLoad(key, false),
    done,
    render,
  }
}
