import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { Navbar, Button } from 'react-bootstrap'

class Menu extends React.Component {

    render(){
      const navStyle = {
        background: '#e6fff7'
      }
      const actStyle= {
        background: '#e6ffe6',
        color: 'black',
        padding: 26,
        borderStyle: 'dotted',
        borderColor: 'mistyrose',
        marginBottom: 10,
        fontSize: 16
       }

       const buttonStyle= {
        color: 'ff8080',
        marginRight: 10,
       }
    return(
      <Navbar inverse collapseOnSelect style={navStyle}> 
      
        <Navbar.Collapse>
        <Navbar.Text>
        <NavLink className="nav-item" style={actStyle} exact to="/"> Etusivu</NavLink>
        </Navbar.Text>
        <Navbar.Text>
        <NavLink style={actStyle} exact to="/kysymykset">Kysymykset</NavLink>
        </Navbar.Text>
        {window.localStorage.getItem('loggedUser') === null ?
        null : <Navbar.Text>
                <NavLink style={actStyle} exact to="/lisaa">Uusi kysymys</NavLink>
               </Navbar.Text>}
        {window.localStorage.getItem('loggedUser') === null ?
        null :<Navbar.Form pullRight>
              <Button style={buttonStyle}>Log out</Button>
              </Navbar.Form>}
      </Navbar.Collapse>
      </Navbar>
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
  )(Menu)