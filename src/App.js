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

class App extends React.Component {

  componentDidMount = async() => {
    this.props.getKysymykset()
  } 

  kysymysById = (id) => {
    console.log('id', id)
    
    console.log('kysymykset', this.props.kysymykset)
    console.log('yksiKysymys', this.props.kysymykset.find(k => k.id === id))
    return(
      this.props.kysymykset.find(k => k.id === id)
    )
  }
  
  render() {
    console.log('loggedUser', window.localStorage.getItem('loggedNoteappUser'))
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
            {window.localStorage.getItem('loggedUser') === null ?
              null : <Route path="/lisaa" render={({ history }) => <HtmlForm history={history}/>}/>
            }
            <Route exact path="/kysymykset/:id" render={({match}) =>
                 <Kysymys kysymys={this.kysymysById(match.params.id)} />}
            />
          </div>
        </Router>
      </div>
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
