let electron = require('electron')
let process = require('process')

electron.app.on('ready', function () {
  let win = new electron.BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true,
    icon: 'icon.png',
    webPreferences: {
      nodeIntegration: true,
    },
  })

  win.loadURL('file://' + process.cwd() + '/hallway.html')

  win.webContents.on('new-window', function (event, url) {
    event.preventDefault()
    electron.shell.openExternal(url)
  })
})

electron.app.commandLine.appendSwitch('disable-smooth-scrolling')
