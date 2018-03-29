import React from 'react'
import { connect } from 'react-redux'
import HtmlForm from './components/HtmlForm'
import Home from './components/Home'
import Menu from './components/Menu'
import Kysymykset from './components/Kysymykset'
import Kysymys from './components/Kysymys'
import Kone from './components/Kone'
import Login from './components/Login'
import Notification from './components/Notification'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import { getKysymykset } from './reducers/kysymyksetReducer'
import { Container, Header } from 'semantic-ui-react'
import kysymysService from './services/kysymys'

class App extends React.Component {

  componentWillMount = async() => {
    this.props.getKysymykset()
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      kysymysService.setToken(user.token)
    }  
  } 

  kysymysById = (id) => {
    return(
      this.props.kysymykset.find(k => k.id === id)
    )
  }
  
  render() {
    const navStyle = {
      background: '#ffe6e6',
      color: 'white',
      marginLeft: 0,
    }
    return (
      <Container>
      <Header as='h1' block style={navStyle} textAlign='justified'>V a a L i K o n e</Header>
        <Notification/>
        <Router>
          <div>
            <Menu/>
            <Route exact path="/" render={() => <Home />} />
            <Route exact path="/kysymykset" render={() => <Kysymykset />} />
            <Route exact path="/kone" render={() => <Kone />} />
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
