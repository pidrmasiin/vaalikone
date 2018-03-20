
import React from 'react'
import loginService from '../services/login'

class Login extends React.Component {

    login = async (e) => {
        e.preventDefault()
        try{
          const user = await loginService.login(
            e.target.username.value,
            e.target.password.value)

            e.target.username.value = ''
            e.target.password.value = ''
        } catch(exception) {
          console.log('virhe')
        }
      }
      handleSubmit = (e) => {
          console.log('pass', e.target.password.value)
      }

    render() {
    return (
    <div>
    <h2>Kirjaudu</h2>

    <form onSubmit={this.handleSubmit}>
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

export default Login