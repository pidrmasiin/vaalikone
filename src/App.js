import React from 'react'
import { connect } from 'react-redux'
import HtmlForm from './components/form/HtmlForm'
import Home from './components/Home'
import Menu from './components/Menu'
import Kysymykset from './components/kysymykset/Kysymykset'
import Kategoriat from './components/kategoriat/Kategoriat'
import Kategoria from './components/kategoriat/Kategoria'
import UusiKategoria from './components/kategoriat/UusiKategoria'
import Kysymys from './components/kysymykset/Kysymys'
import Kone from './components/Kone'
import Login from './components/Login'
import Notification from './components/Notification'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import { getKysymykset } from './reducers/kysymyksetReducer'
import { getKategoriat } from './reducers/kategoriatReducer'
import { Container, Header } from 'semantic-ui-react'

class App extends React.Component {

  componentWillMount = async() => {
    this.props.getKysymykset()
    this.props.getKategoriat()
  } 

  kysymysById = (id) => {
    return(
      this.props.kysymykset.find(k => k.id === id)
    )
  }

  kategoriaById = (id) => {
    return(
      this.props.kategoriat.find(k => k.id === id)
    )
  }
  
  render() {
    const navStyle = {
      
      background: '#669999',
      color: 'white',
      marginLeft: 0,
    }
    
    return (
      <Container>
      <Header as='h1' block style={navStyle} textAlign='justified'>V A A L I K O N E</Header>
        <Notification/>
        <Router>
          <div>
            <Menu/>
            <Route exact path="/" render={() => <Home />} />
            <Route exact path="/kategoriat" render={() => <Kategoriat />} />
            <Route exact path="/kysymykset" render={() => <Kysymykset />} />
            <Route exact path="/kone" render={() => <Kone />} />
            <Route exact path="/login" render={({ history }) => <Login history={history}/>} />
            {window.localStorage.getItem('loggedUser') === null ?
              null :<div>
                      <Route path="/lisaa" render={({ history }) => <HtmlForm history={history}/>}/>
                      <Route path="/uusikategoria" render={({ history }) => <UusiKategoria history={history}/>}/>
                  </div>}
            <Route exact path="/kysymykset/:id" render={({match}) =>
                 <Kysymys kysymys={this.kysymysById(match.params.id)} />}
            />
            <Route exact path="/kategoriat/:id" render={({match}) =>
                 <Kategoria kategoria={this.kategoriaById(match.params.id)} kysymykset={this.props.kysymykset} />}
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
   kysymykset: state.kysymykset,
   kategoriat: state.kategoriat
  }
}

export default connect(
  mapStateToProps, 
  { getKysymykset, getKategoriat }
)(App)
