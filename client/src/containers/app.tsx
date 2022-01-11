import React from 'react'
import { connect } from 'react-redux'


const App = ({message}: {message: string}) => {
  return (
    <span>{message}</span>
  )
}

const mapStateToProps = (state: any) => {
  return {
    message: state.message
  }
}
export default connect(mapStateToProps, null)(App)


