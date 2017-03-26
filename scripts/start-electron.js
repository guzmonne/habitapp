const port = process.env.PORT 
              ? process.env.PORT
              : 5000
const startURL = `http://localhost:${port}`
const exec = require('child_process').exec
exec(`NODE_ENV=development ELECTRON_START_URL=${startURL} yarn electron`)