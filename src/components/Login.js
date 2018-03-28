
import React from 'react'
import { connect } from 'react-redux'
import loginService from '../services/login'
import { userLogin } from '../reducers/userReducer'
import { Form, Button } from 'semantic-ui-react'


class Login extends React.Component {

    login = async (e) => {
        e.preventDefault()
        try{
            const user = await loginService.login({
                username: e.target.username.value,
                password: e.target.password.value
              })
            window.localStorage.setItem('loggedUser', JSON.stringify(user))
            this.props.userLogin(user.username)
            setTimeout(() => {
                window.localStorage.removeItem('loggedUser')
            }, 90000);
            
        } catch(exception) {
          console.log('virhe')
        }
        
      }
      

    render() {
    return (
    <div>
    <h2>Kirjaudu</h2>

    <form onSubmit={this.login}>
    <div>
        Käyttäjätunnus
         <Form.Input
         name="username"
         />
        </div>
        <div>
        Salasana
         <Form.Input
            type="password"
            name="password"
        />
        </div>
        <br></br>
        <Button inverted color='green' type="submit">Kirjaudu</Button>
        </form>
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
    { userLogin }
  )(Login)