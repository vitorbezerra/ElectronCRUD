const { app, BrowserWindow, ipcMain, Menu } = require('electron')

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
  mainWindow.once('ready-to-show', async () => {
    mainWindow.show()
    list_users()
  })

  // close the app
  mainWindow.on('closed', () => {
    mainWindow = null
  })

  // Build menu from template
  const mainMenu = Menu.buildFromTemplate(mainMenuTempale)
  // Insert Menu
  Menu.setApplicationMenu(mainMenu)

})

// menu items

// create menu template 

const mainMenuTempale = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Add User',
        click() {
          mainWindow.loadURL(`file://${__dirname}/create.html`)
        }
      },
      {
        label: 'Quit',
        click() {
          app.quit()
        }
      }
    ]
  }
]


// Add developer tools

if (process.env.NODE_ENV !== 'production') {
  mainMenuTempale.push({
    label: 'Developer Tools',
    submenu: [
      {
        label: 'Toggle DevTools',
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools()
        }
      },
      {
        role: 'reload'
      }
    ]
  })
}

// routes

ipcMain.on('go-index', async () => {
  mainWindow.loadURL(`file://${__dirname}/index.html`)
  mainWindow.webContents.once('dom-ready', list_users)
})

ipcMain.on('create', async (event, arg) => {
  const usercreate = await Users.create({
    username: arg.username,
    firstname: arg.firstname,
    lastname: arg.lastname,
    email: arg.email,
    t_consumed: 0
  })
  mainWindow.loadURL(`file://${__dirname}/index.html`)
  mainWindow.webContents.once('dom-ready', list_users)
})

ipcMain.on('update', async (event, arg) => {
  mainWindow.loadURL(`file://${__dirname}/update.html`)
  mainWindow.webContents.once('dom-ready', async () => {
    const user = await Users.findByPk(arg)
    mainWindow.webContents.send('userupdate', user.dataValues)
  })
})

ipcMain.on('updatevalues', async (event, arg) => {
  let user_update = await Users.update({
    firstname: arg.firstname, lastname: arg.lastname,
    email: arg.email, t_consumed: parseFloat(arg.t_consumed)
  }, { where: { username: arg.username } })
  mainWindow.loadURL(`file://${__dirname}/index.html`)
  mainWindow.webContents.once('dom-ready', list_users)
})

ipcMain.on('destroy-user', async (event, arg) => {
  const del_user = Users.destroy({ where: { username: arg } })
  mainWindow.loadURL(`file://${__dirname}/index.html`)
  mainWindow.webContents.once('dom-ready', list_users)
})

async function list_users() {
  const users = await Users.findAll()
  mainWindow.webContents.send('user-list', users)
}