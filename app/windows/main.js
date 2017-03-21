const {BrowserWindow} = require('electron')

function mainWindow(onClose=function(){}){
  // Create the browser window.
  const win = new BrowserWindow({
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
    pathname: path.join(__dirname, '../renderer/index.html'),
    protocol: 'file',
    slashes: true,
  })
  win.loadURL(startURL)
  // Open the DevTools
  win.webContents.openDevTools()
  // Emitted when the window is closed.
  win.on('closed', onClose)
  // If working in development mode, install React DevTools
  if (process.env.NODE_ENV === 'development'){
    const {
      default: installExtension,
      REACT_DEVELOPER_TOOLS
    } = require('electron-devtools-installer')
    // Install chrome extensions
    installExtension(REACT_DEVELOPER_TOOLS)
      .then((name) => console.log.call(console, `Added Extension:  ${name}`))
      .catch((err) => console.log.call(console, 'An error occurred: ', err));
  }
  // Return the created window object.
  return win
}

exports = module.exports = mainWindow
