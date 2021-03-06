const {app, ipcMain: ipc} = require('electron')
const serverWindow = require('./windows/server.js')
const nodeConsole = require('console')
const mainWindow = require('./windows/main.js')
const graphqlWindow = require('./windows/graphql.js')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
const wins = {
  main: null,
  server: null,
  graphql: null,
}

console.log('Something')

function createWindows() {
  nodeConsole.log(app.getPath('userData'))
  if (wins.server === null)
    wins.server = serverWindow(() => wins.server = null)
  if (wins.main === null)
    wins.main = mainWindow(() => wins.main = null)
}

// This method will be called when Electron has finished
// intialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindows)

// Quit when all windows are closed
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Quit
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the 
  // dock icon is clicked and there are no other windows open.
  if (wins.main === null) createWindows()
  if (wins.server === null) createWindows()
})

// Initialize nedb
require('./modules/db.js')

// Listen to ipcRendere events
ipc.on('open:graphql_window', (event) => {
  wins.graphql = graphqlWindow.open(() => {
    wins.graphql = null
    event.sender.send('close:graphql_window')
  })
  event.sender.send('open:graphql_window:done')
})

ipc.on('close:app', (event) => {
  app.quit()
})
