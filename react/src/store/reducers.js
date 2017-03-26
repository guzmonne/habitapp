import * as ActionTypes from './actions.js'
import {combineReducers} from 'redux'
import {client} from './apollo.js'

const clicks = (state = {clicks: 0}, action) => {
  switch(action.type) {
    case ActionTypes.CLICK_EVENT:
      return {
        ...state,
        clicks: state.click + 1,
      }
    default:
      return state
  }
}

const rootReducers = combineReducers({
  apollo: client.reducer(),
  clicks,
})

export default rootReducers
