import { ALERT_POP } from '../actions/alert'
import { Action, AlertState } from './types'

const alertReducer = (state: AlertState = {}, action: Action) => {
  switch (action.type) {
  case ALERT_POP:
    return { message: action.message }
  default:
    return state
  }
}

export default alertReducer

