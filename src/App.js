import React from 'react'
import { connect } from 'react-redux'
import HtmlForm from './components/HtmlForm'
import Home from './components/Home'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'

const Menu = () => {

  const divStyle = {
    color: '#7da6cf',
    background: '#ecf2f8',
    borderStyle: 'solid',
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
    }
    const actStyle= {
      fontWeight: 'bold',
     }
  return(
    <div style={divStyle}>    
    <NavLink activeStyle={actStyle} exact to="/">Etusivu</NavLink>&nbsp;
    <NavLink activeStyle={actStyle} exact to="/lisaa">Uusi kysymys</NavLink>&nbsp;
    </div>
)
}

class App extends React.Component {
  render() {
    return (
      <div  className="container">
      <h1>Vaalikone</h1>
        <Router>
          <div>
            <Menu/>
            <Route exact path="/" render={() => <Home />} />
            <Route path="/lisaa" render={() => <HtmlForm />} />
          </div>
        </Router>
      </div>
    )
  }
}

export default connect(null)(App)
