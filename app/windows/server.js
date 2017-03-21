const {BrowserWindow} = require('electron')
const net = require('net')
const url = require('url')
const path = require('path')
const graphqlWindow = require('./graphql.js')

let openedWindow = false
let graphqlWin = null
const client = new net.Socket()
const port = 3000

function openGraphqlWindow() {
  // Close connection to the client
  client.end()
  // If the window is already opened, do nothing.
  if (openedWindow === true) return
  openedWindow = true
  // Create the graphql window
  graphqlWin = graphqlWindow(() => graphqlWin = null)
}

function tryToOpenTheGraphqlWindow() {
  client.connect({port}, openGraphqlWindow)
}

function serverWindow(onClose=function(){}) {
  // Create the server window
  const win = new BrowserWindow({
    show: true,
    width: 800,
    height: 300,
  })
  // Define the location of the server renderer file.
  const startUrl = url.format({
    pathname: path.join(__dirname, '../renderer/server.html'),
    protocol: 'file',
    slashes: true,
  })
  // Load the page
  win.loadURL(startUrl)
  // Open the DevTools
  win.webContents.openDevTools()
  // Run the onClose callback on 'closed' event.
  win.on('closed', onClose)
  // If the socket is not up, try again in a minute.
  client.on('error', err => (
    setTimeout(tryToOpenTheGraphqlWindow, 1000)
  ))
  // Try to open the graphql window.
  tryToOpenTheGraphqlWindow()
  // Return the modified window
  return win
}

exports = module.exports = serverWindow