const {BrowserWindow} = require('electron')
const url = require('url')
const path = require('path')

/**
 * @function serverWindow
 * @description Opens the server window.
 * @param {Function} onClose Function to call after a 'closed' event.
 */
function serverWindow(onClose=function(){}) {
  // Create the server window
  const win = new BrowserWindow({
    show: true,
    width: 480,
    height: 72,
    x: 0,
    y: 0,
    frame: false,
    alwaysOnTop: true,
    skipTaskbar: true,
    transparent: true,
  })
  // Define the location of the server renderer file.
  const startUrl = url.format({
    pathname: path.join(__dirname, '../renderer/server.html'),
    protocol: 'file',
    slashes: true,
  })
  // Load the page
  win.loadURL(startUrl)
  // Run the onClose callback on 'closed' event.
  win.on('closed', onClose)
  // Return the modified window
  return win
}

exports = module.exports = serverWindow