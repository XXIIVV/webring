'use strict'

const Progress = keys => {
  const stack = new Set(keys.filter(key => key))
  const loaded = new Set()
  const failed = new Set()

  this.ratio = () => {
    return loaded.size / stack.size
  }

  this.percentage = () => {
    return (100 * this.ratio()).toFixed(2)
  }

  const render = () => `
    <div class='${loaded.size !== stack.size ? 'busy' : 'done'}'>
      <p>
        ${'|'.repeat(this.ratio() * 10)}
        ${loaded.size !== stack.size ? this.percentage() + '% ' : ''}
        ${loaded.size === stack.size ? 'Complete' : 'Loading'}
        ${failed.size !== 0 ? `(${failed.size} failed)` : ''}
      </p>
    </div>`

  const didLoad = (key, success) => new Promise((resolve, reject) => {
    if (stack.has(key)) {
      loaded.add(key)
      if (!success) failed.add(key)
      return resolve()
    } else {
      return reject()
    }
  })

  return {
    success: key => didLoad(key, true),
    failure: key => didLoad(key, false),
    toString: render
  }
}
