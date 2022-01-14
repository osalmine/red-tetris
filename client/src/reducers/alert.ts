import { ALERT_POP } from '../actions/alert'
import { AlertAction } from '../actions/types'
import { AlertState } from './types'

const alertReducer = (state: AlertState = {}, action: AlertAction) => {
  switch (action.type) {
  case ALERT_POP:
    return { message: action.message }
  default:
    return state
  }
}

export default alertReducer

