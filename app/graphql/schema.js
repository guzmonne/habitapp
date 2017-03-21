const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLUnionType,
  GraphQLEnumType,
  GraphQLInputObjectType,
  GraphQLInterfaceType,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLFloat,
  GraphQLString,
  GraphQLID,
  GraphQLList,
} = require('graphql');

const ClickType = new GraphQLObjectType({
  name: 'ClickType',
  fields: () => ({
    _id: {type: GraphQLID},
    timestamp: {type: GraphQLFloat},
  })
})

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    clicks: {
      type: new GraphQLList(ClickType),
      description: 'Click events',
      resolve: () => ([{_id: 1, timestamp: 2}])
    }
  })
})

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Mutation type',
  fields: {
    click: {
      name: 'Click Mutations',
      description: 'Click mutation types',
      type: new GraphQLObjectType({
        name: 'click',
        description: 'Click mutations',
        fields: {
          add: {
            type: ClickType,
            args: {
              timestamp: {type: GraphQLString},
            },
            resolve: (source, {timestamp}) => {
              console.log(args)
              return {
                _id: Date.now(),
                timestamp,
              }
            }
          }
        }
      })
    }
  }
})

const schema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
})

exports = module.exports = schema