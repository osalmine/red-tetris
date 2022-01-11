import { State } from '../types'

declare global {
  interface Window {
      state: State;
  }
}

export const storeStateMiddleWare = ({ getState }: {getState: any}) => (next: any) => (action: any) => {
  const returnValue = next(action)
  if (window.top) {
    window.top.state = getState()
  }
  return returnValue
}
