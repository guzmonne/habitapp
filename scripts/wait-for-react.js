const net = require('net')
const port = process.env.PORT 
              ? process.env.PORT - 100
              : 5000

process.env.ELECTRON_START_URL = `http://127.0.0.1:${port}`

const client = new net.Socket()

let startedElectron = false

const runElectron = () => {
  client.end()
  if (!startedElectron) {
    console.log('\nStarting electron\n')
    startedElectron = true
    const exec = require('child_process').exec
    exec('yarn run electron:dev')
  }
}

const tryConnection = () => (
  client.connect({port}, runElectron)
)

tryConnection()

client.on('error', err => setTimeout(tryConnection, 1000))