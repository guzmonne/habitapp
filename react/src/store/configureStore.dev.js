import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers.js'
import {client} from './apollo.js'

const configureStore = preloadedState => {
  const composeEnhancers = (
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  )
  
  const store = createStore(
    rootReducer,
    preloadedState,
    composeEnhancers(
      applyMiddleware(client.middleware(), thunk)
    )
  )
  
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers.
    module.hot.accept('./reducers.js', () => {
      const nextRootReducer = require('./reducers.js').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}

export default configureStore
