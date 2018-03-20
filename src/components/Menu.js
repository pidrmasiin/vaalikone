import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

class Menu extends React.Component {

    render(){
    const divStyle = {
      color: '#00b3b3',
      background: 'mistyrose',
      borderStyle: 'solid',
      padding: 10,
      marginBottom: 10,
      fontSize: 16,
      }
      const actStyle= {
        fontWeight: 'bold',
        color: '#00b3b3',
        padding: 10,
        marginBottom: 10,
        fontSize: 20
       }
       
    return(
      <div style={divStyle}>   
      <NavLink style={actStyle} exact to="/">Etusivu</NavLink>
      <NavLink style={actStyle} exact to="/kysymykset">Kysymykset</NavLink>
      {this.props.user === '' ?
      null : <NavLink style={actStyle} exact to="/lisaa">Uusi kysymys</NavLink>
        }
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
    mapStateToProps
  )(Menu)