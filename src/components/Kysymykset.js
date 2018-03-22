import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'

const tableStyle= {
    background: 'mistyrose',
    color: 'black',
    fontWeight: 'bold'
   }

   const linkStyle= {
    color: 'black',
    fontSize: 14,
    fontWeight: 'normal'
   }

class Kysymykset extends React.Component {
    
    render() {
        return(
            <div>
            <table className="table table-striped" style={tableStyle}>
                <thead>
                <tr>
                <th scope="col"><h4>Kysymys</h4></th>
                {window.localStorage.getItem('loggedUser') === null ?
                null : <th scope="col">Poisto</th>}
                 </tr>
                </thead>
                <tbody>
                {this.props.kysymykset.map(k => 
                <tr key={k.id}>
                <th><Link style={linkStyle} to={`/kysymykset/${k.id}`}>{k.kysymys}</Link></th>
                <th>{window.localStorage.getItem('loggedUser') === null ?
                null : <Button className="btn btn-danger">Delete</Button>}</th>
                </tr>  
                 )}              
                </tbody>
            </table>
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