import React from 'react'
import { connect } from 'react-redux'
import HtmlForm from './components/HtmlForm'
import Home from './components/Home'
import Menu from './components/Menu'
import Kysymykset from './components/Kysymykset'
import Kysymys from './components/Kysymys'
import Login from './components/Login'
import Notification from './components/Notification'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import { getKysymykset } from './reducers/kysymyksetReducer'
import { Container } from 'semantic-ui-react'

class App extends React.Component {

  componentDidMount = async() => {
    this.props.getKysymykset()
  } 

  kysymysById = (id) => {
    
    return(
      this.props.kysymykset.find(k => k.id === id)
    )
  }
  
  render() {
    return (
      <Container>
      <h1>Vaalikone</h1>
        <Notification/>
        <Router>
          <div>
            <Menu/>
            <Route exact path="/" render={() => <Home />} />
            <Route exact path="/kysymykset" render={() => <Kysymykset />} />
            <Route exact path="/login" render={({ history }) => <Login history={history}/>} />
            {window.localStorage.getItem('loggedUser') === null ?
              null : <Route path="/lisaa" render={({ history }) => <HtmlForm history={history}/>}/>
            }
            <Route exact path="/kysymykset/:id" render={({match}) =>
                 <Kysymys kysymys={this.kysymysById(match.params.id)} />}
            />
          </div>
        </Router>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
   user: state.user,
   kysymykset: state.kysymykset
  }
}

export default connect(
  mapStateToProps, 
  { getKysymykset }
)(App)
