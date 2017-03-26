import {createStore, applyMiddleware} from 'redux'
import thunk from 'react-thunk'
import rootReducer from './reducers.js'

const configureStore = preloadedState => createStore(
  rootReducer,
  preloadedState,
  applyMiddleware(thunk)
)

export default configureStore
