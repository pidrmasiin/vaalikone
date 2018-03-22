
import React from 'react'
import { connect } from 'react-redux'
import loginService from '../services/login'
import { userLogin } from '../reducers/userReducer'


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
        käyttäjätunnus
         <input
         name="username"
         />
        </div>
        <div>
        salasana
         <input
            type="password"
            name="password"
        />
        </div>
        <button type="submit">Kirjaudu</button>
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