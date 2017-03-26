import React, {PropTypes as T} from 'react'
import {ApolloProvider} from 'react-apollo'
import App from './App.js'
import {client} from '../store/apollo.js'

const Root = ({store}) => (
  <ApolloProvider store={store} client={client}>
    <App />
  </ApolloProvider>
)

Root.propTypes = {
  store: T.object.isRequired, // Redux Store
}

export default Root
