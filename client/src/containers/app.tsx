import React from 'react'
import { connect } from 'react-redux'

const App = ({ message }: {message: string}) => (
  <span>{message}</span>
)

const mapStateToProps = (state: any) => ({
  message: state.message,
})
export default connect(mapStateToProps, null)(App)

