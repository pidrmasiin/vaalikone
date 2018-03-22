import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table, Button } from 'semantic-ui-react'

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
            <Table celled>
                <Table.Header>
                <Table.Row>
                <Table.HeaderCell>Kysymys</Table.HeaderCell>
                {window.localStorage.getItem('loggedUser') === null ?
                null : <Table.HeaderCell>>Poisto</Table.HeaderCell>}
                </Table.Row>
                </Table.Header>
                <Table.Body>
                {this.props.kysymykset.map(k => 
                <Table.Row key={k.id}>
                <Table.Cell><Link style={linkStyle} to={`/kysymykset/${k.id}`}>{k.kysymys}</Link></Table.Cell>
                <Table.Cell>{window.localStorage.getItem('loggedUser') === null ?
                null : <Button className="btn btn-danger">Delete</Button>}</Table.Cell>
                </Table.Row>   
                 )}              
                </Table.Body>
            </Table>
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