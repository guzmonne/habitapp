const {BrowserWindow} = require('electron')
const net = require('net')
const graphqlWindow = require('./graphql.js')

let openedWindow = false
const client = new net.Socket()
const port = 3000

/**
 * @function openGraphqlWindow
 * @description It opens the graphql window if it hasn't been opened yet.
 * @return {Void}
 */
function openGraphqlWindow() {
  // Close connection to the client
  client.end()
  // If the window is already opened, do nothing.
  if (openedWindow === true) return
  openedWindow = true
  // Create the graphql window
  graphqlWin = graphqlWindow(() => graphqlWin = null)
}
/**
 * @function tryToOpenTheGraphqlWindow
 * @description Attempts to the connect to the given port. If it succeeds it 
 *              will call the openGraphqlWindow() function.
 * @return {Void}
 */
function tryToOpenTheGraphqlWindow() {
  client.connect({port}, openGraphqlWindow)
}
function graphqlWindow(onClose=function(){}) {
  // Define the new window.
  const win = new BrowserWindow({
    width: 800,
    height: 800,
  })
  // Load the GraphiQL URL
  const startUrl = 'http://localhost:3000/graphiql'
  win.loadURL(startUrl)
  // Set the onClose event callback.
  win.on('closed', onClose)
  // Return the created window.
  return win
}

exports = module.exports = {
  graphqlWindow,
  tryToOpenTheGraphqlWindow,
}
