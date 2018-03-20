import React from 'react'
import { connect } from 'react-redux'
import HtmlForm from './components/HtmlForm'
import Home from './components/Home'
import Menu from './components/Menu'
import Kysymykset from './components/Kysymykset'
import Login from './components/Login'
import Notification from './components/Notification'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import { getKysymykset } from './reducers/kysymyksetReducer'

class App extends React.Component {

  componentDidMount = async() => {
    this.props.getKysymykset()
  } 

  render() {
    console.log('appRender', this.props.user)
    return (
      <div  className="container">
      <h1>Vaalikone</h1>
        <Notification/>
        <Router>
          <div>
            <Menu/>
            <Route exact path="/" render={() => <Home />} />
            <Route exact path="/kysymykset" render={() => <Kysymykset />} />
            <Route path="/login" render={({ history }) => <Login history={history}/>} />
            {this.props.user === '' ?
              null : <Route path="/lisaa" render={({ history }) => <HtmlForm history={history}/>}/>
            }
            
          </div>
        </Router>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
   user: state.user
  }
}

export default connect(
  mapStateToProps, 
  { getKysymykset }
)(App)
