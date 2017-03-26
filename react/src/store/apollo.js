import {ApolloClient, createNetworkInterface} from 'react-apollo'

export const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    addTypename: true,
    dataIdFromObject: (result) => (
      result._id && result.__typename
      ? result.__typename + result._id
      : null
    ),
    uri: 'http://localhost:3000/graphql'
  })
})
