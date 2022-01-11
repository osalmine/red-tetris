import { ALERT_POP } from '../actions/alert'
import { Action } from './types'
import { State } from '../types'

const reducer = (state: State = {}, action: Action) => {
  switch (action.type) {
  case ALERT_POP:
    return { message: action.message }
  default:
    return state
  }
}

export default reducer

