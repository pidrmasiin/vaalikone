import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Menu, Button } from 'semantic-ui-react'

class Nav extends React.Component {

    logout = () => {
    window.localStorage.removeItem('loggedUser')
    }

    render(){
      const navStyle = {
        background: '#a3c2c2',
        marginLeft: 0,
      }

      const linkStyle = {
        color: "black"
      }

      
     
    return(

      <Menu inverted style={navStyle}>
      <Menu.Item link>
        <Link style={linkStyle} to="/"> Etusivu</Link>
      </Menu.Item>
      <Menu.Item link>
        <Link style={linkStyle} to="/kone">Vaalikone</Link>
      </Menu.Item>
      <Menu.Item link>
        <Link style={linkStyle} to="/kysymykset">Kysymykset</Link>
      </Menu.Item>
      <Menu.Item link>
        <Link style={linkStyle} to="/kategoriat">Kategoriat</Link>
      </Menu.Item>
        {window.localStorage.getItem('loggedUser') === null ?
          null : <Menu inverted style={navStyle}><Menu.Item link>
             <Link style={linkStyle} to="/lisaa">Uusi kysymys</Link>
            </Menu.Item>
            <Menu.Item link>
            <Link style={linkStyle} to="/uusikategoria">Uusi kategoria</Link>
           </Menu.Item></Menu>}
      <Menu.Menu position='right'>
        {window.localStorage.getItem('loggedUser') === null ?
          <Menu.Item link>
          <Link to="/login">Kirjaudu</Link>
          </Menu.Item>
          :
          <Menu.Item>
            <form onSubmit={this.logout}>
              <Button type="submit"> Kirjaudu ulos</Button>
            </form>
          </Menu.Item>
        }
      </Menu.Menu>
    </Menu>
   
    )
  }
  
}

const mapStateToProps = (state) => {
    return {
     user: state.user
    }
  }
  
  export default connect(
    mapStateToProps
  )(Nav)