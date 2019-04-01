const { app, BrowserWindow } = require('electron')
// get DB credentials
const options = require('./options')

// main window
let mainWindow = null

app.on('ready', () => {
  // don't show the main window
  mainWindow = new BrowserWindow({ show: false })

  // load index.html on the main window
  mainWindow.loadURL(`file://${__dirname}/index.html`)

  // when the app is ready, the main window is showed
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  });

  // close the app
  mainWindow.on('closed', () => {
    mainWindow = null
  })
})





