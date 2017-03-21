/**
 * @type Script
 * @description This node scripts runs both create-react-app script and electron
 *              development environment in order. So that when electron runs 
 *              create-react-app has all it's tools ready, including the
 *              development server.
 *              
 *              The script first checks that create-react-app socket is up and
 *              then does a GET request to the development server to check if 
 *              the development page is ready. If everthing is ok, it will start
 *              the electron process.
 * 
 *              This script is heavily inspired by @csepulv. The original can be
 *              found at: csepulv/electron-with-create-react-app repo.
 */
const http = require('http')
const net = require('net')
/** Local varibles */
const port = process.env.PORT 
              ? process.env.PORT - 100
              : 5000
const startURL = `http://localhost:${port}`
let startedElectron = false
// Start the socket
const client = new net.Socket()
/**
 * @function request
 * @description Checks the status of create-react-app development server. If up
 *              it runs the electron development environment task.
 * @return {Void}
 */
const request = () => {
  client.end()
  http.get(startURL, res => {
    if(res.statusCode === 200){
      console.log('\nStarting electron\n')
      if (!startedElectron) {
        startedElectron = true
        const exec = require('child_process').exec
        exec(`NODE_ENV=development ELECTRON_START_URL=${startURL} yarn electron`)
      }
    }
    res.on('error', console.log.bind(console, 'Got error:'))
  })
}
/**
 * @function trySocket
 * @description Checks the status of create-react-app socket. If up, it calls 
 *              the tryRequest function.
 */
const trySocket = () => {
  console.log(`Testing port ${port}...`)
  client.connect({port}, request)
}
// Retry the trySocket function if an error occurs
client.on('error', err => setTimeout(trySocket, 1000))
// Start checking the socket
trySocket()
