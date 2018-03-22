
import React from 'react'
import { connect } from 'react-redux'
import loginService from '../services/login'
import { userLogin } from '../reducers/userReducer'


class Login extends React.Component {

    login = async (e) => {
        e.preventDefault()
        try{
            console.log('moi')
            const user = await loginService.login({
                username: e.target.username.value,
                password: e.target.password.value
              })
            console.log('haloo')
            window.localStorage.setItem('loggedUser', JSON.stringify(user))
            console.log('loggedUser', window.localStorage.getItem('loggedUser'))
        } catch(exception) {
          console.log('virhe')
        }
        
      }
      

    render() {
        console.log('this.props.user', this.props.user)
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
    userLogin
  )(Login)