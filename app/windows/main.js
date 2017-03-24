const {BrowserWindow} = require('electron')

function installDevTools() {
  const {
    default: installExtension,
    REACT_DEVELOPER_TOOLS
  } = require('electron-devtools-installer')
  // Install chrome extensions
  installExtension(REACT_DEVELOPER_TOOLS)
    .then((name) => console.log.call(console, `Added Extension:  ${name}`))
    .catch((err) => console.log.call(console, 'An error occurred: ', err));
}

function mainWindow(onClose=function(){}){
  const win = new BrowserWindow({
    width: 800,
    height: 600,
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

  win.on('closed', onClose)

  if (process.env.NODE_ENV === 'development')
    installDevTools()

  return win
}

exports = module.exports = mainWindow
