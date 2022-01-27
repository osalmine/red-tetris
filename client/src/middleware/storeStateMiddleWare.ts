import { RootState } from '../store'

declare global {
  interface Window {
      state: RootState;
  }
}

// export const storeStateMiddleWare = ({ getState }: {getState: any}) => (next: Dispatch) =>
//   (action: PingAction | AlertAction) => {
//     const returnValue = next(action)
//     if (window.top) {
//       window.top.state = getState()
//     }
//     return returnValue
//   }
