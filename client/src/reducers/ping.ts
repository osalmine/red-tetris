import { SERVER_PING } from '../actions/server'
import { PingAction } from '../actions/types'
import { PingState } from './types'

const pingReducer = (state: PingState = {}, action: PingAction) => {
  switch (action.type) {
  case SERVER_PING:
    return { message: action.message }
  default:
    return state
  }
}

export default pingReducer

