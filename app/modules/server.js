const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const {graphqlExpress, graphiqlExpress} = require('graphql-server-express')

const schema = require('../graphql/schema.js')
const PORT = 3000

const app = express()

function log(req, res, next) {
  console.log(JSON.stringify(req.body, null, 2))
  next()
}

app.use('*', cors())

// bodyParser is needed just for POST
app.use('/graphql', bodyParser.json(), log, graphqlExpress({
  schema,
}))

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}))

app.listen(PORT)
