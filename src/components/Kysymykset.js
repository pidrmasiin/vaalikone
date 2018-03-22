import React from 'react';
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { ListGroupItem } from 'react-bootstrap'

class Kysymykset extends React.Component {

    
    render() {
        return(
            <div>
            {this.props.kysymykset.map(k => 
            <ListGroupItem key={k.id} >
            <NavLink to={`/kysymykset/${k.id}`}>{k.kysymys}</NavLink>
            </ListGroupItem>
            )}
            </div>
        )
    }
      
}
const mapStateToProps = (state) => {
    return {
     kysymykset: state.kysymykset
    }
  }
export default connect(
    mapStateToProps,
    null
  )(Kysymykset)