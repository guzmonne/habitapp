const {BrowserWindow} = require('electron')

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

exports = module.exports = graphqlWindow
