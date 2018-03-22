import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Menu } from 'semantic-ui-react'

class Nav extends React.Component {

    render(){
      const navStyle = {
        background: '#e6fff7',
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
        <Link style={linkStyle} to="/kysymykset">Kysymykset</Link>
      </Menu.Item>
        {window.localStorage.getItem('loggedUser') === null ?
          null : <Menu.Item link>
             <Link style={linkStyle} to="/lisaa">Uusi kysymys</Link>
            </Menu.Item>}
           
            <Menu.Menu position='right'>
        {window.localStorage.getItem('loggedUser') === null ?
          <Menu.Item link>
          <Link to="/login">Kirjaudu</Link>
          </Menu.Item>
          :
          <Menu.Item link>
          <Link to="/login">Kirjaudu</Link>
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