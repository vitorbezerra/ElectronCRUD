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
  mainWindow.once('ready-to-show', async () => {
    mainWindow.show()
    const users = await Users.findAll()
    console.log(users)
    mainWindow.webContents.send('user-list', users)
  });

  // close the app
  mainWindow.on('closed', () => {
    mainWindow = null
  })

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
})

// function list_users(){
//   const list_user = await Users.findAll()

// }

// function del(){
//   const user_delete = await Users.destroy()
// }

// function update(){
//   const user_up = await Users.update({username: "batata"}, {where: "id"})
// }