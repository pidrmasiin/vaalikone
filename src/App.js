import React from 'react'
import { connect } from 'react-redux'
import HtmlForm from './components/HtmlForm'

class App extends React.Component {
  render() {
    return (
      <HtmlForm />
    )
  }
}

export default connect(null)(App)
