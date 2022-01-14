import React from 'react'
import { useAppDispatch, useAppSelector } from '../hooks';
import { alert as addAlert } from '../actions/alert';

const App = () => {
  const dispatch = useAppDispatch();
  const alert = useAppSelector(state => state.alert.message);

  const onAddAlert = () => {
    dispatch(addAlert('Tetris kohta...'));
  }

  return (
    <>
      <button onClick={onAddAlert}>Add alert</button>
      <span>{alert}</span>
    </>
  )
}

// const mapStateToProps = (state: any) => ({
//   message: state.message,
// })
// export default connect(mapStateToProps, null)(App)

export default App
