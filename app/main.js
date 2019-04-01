const { app, BrowserWindow, ipcMain } = require('electron')

const models = require('./models')
const Users = models.user
const Op = models.Sequelize.Op

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

ipcMain.on('create-user', (event, arg) => {
  const usercreate = Users.create({
    username: arg.username,
    fistname: arg.firstname,
    lastname: arg.lastname,
    email: arg.email,
  })
  mainWindow.loadURL(`file://${__dirname}/index.html`)
})