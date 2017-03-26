const {merge, range, uniqueId} = require('lodash')
const {makeExecutableSchema} = require('graphql-tools')
const {
  schema: clickSchema,
} = require('./clicks.schema.js')

let clicks = []

const rootSchema = [`
type Query {
  # A list of all the clicks stored.
  clicks: [Click]
}

type Mutation {
  # Add a new click
  addClick(message: String): Click
}

schema {
  query: Query
  mutation: Mutation
}
`]

const rootResolvers = {
  Query: {
    clicks(){
      return clicks
    }
  },
  Mutation: {
    addClick(root, {message}){
      const click = {
        _id: uniqueId('click'),
        timestamp: Date.now(),
        message,
      }
      clicks = clicks.concat(click)
      return Promise.resolve(click) 
    }
  }
}

const schema = [...rootSchema, ...clickSchema]
const resolvers = merge(rootResolvers)

const executableSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers,
})

exports = module.exports = executableSchema