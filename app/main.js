const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow(){
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    //frame: false, // This disables the titlebar and frames.
    //titleBarStyle: 'hidden-inset', // This is just for mac.
    resizable: false,
  })
  // In development an Environment variable can specify thr url for 
  // mainWindow.loadURL. If the env var exists we'll use it; else we'll use the
  // production URL.
  const startURL = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, './index.html'),
    protocol: 'file',
    slashes: true,
  })
  win.loadURL(startURL)

  // Open the DevTools
  win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
  // If working in development mode, install React DevTools
  if (process.env.NODE_ENV === 'development'){
    const {
      default: installExtension,
      REACT_DEVELOPER_TOOLS
    } = require('electron-devtools-installer')
    // Install chrome extensions
    installExtension(REACT_DEVELOPER_TOOLS)
      .then((name) => console.log(`Added Extension:  ${name}`))
      .catch((err) => console.log('An error occurred: ', err));
  }
}

// This method will be called when Electron has finished
// intialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Quit
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the 
  // dock icon is clicked and there are no other windows open.
  if (win === null) createWindow()
})