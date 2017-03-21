const express = require('express')
const bodyParser = require('body-parser')
const {graphqlExpress, graphiqlExpress} = require('graphql-server-express')

const myGraphQLSchema = require('../graphql/schema.js')
const PORT = 3000

const app = express()

// bodyParser is needed just for POST
app.use('/graphql', bodyParser.json(), graphqlExpress({
  schema: myGraphQLSchema,
}))

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}))

app.listen(PORT)
