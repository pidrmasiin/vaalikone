import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'semantic-ui-react'



   const linkStyle= {
    color: 'black',
    fontSize: 14,
    fontWeight: 'normal'
   }

class Kategoriat extends React.Component {

    
    
    render() {
        return(
            <Table celled>
                <Table.Header>
                <Table.Row>
                <Table.HeaderCell positive>Kategoriat</Table.HeaderCell>
                </Table.Row>
                </Table.Header>
                <Table.Body>
                {this.props.kategoriat.map(k => 
                <Table.Row key={k.id}>
                <Table.Cell selectable><Link style={linkStyle} to={`/kategoriat/${k.id}`}>{k.nimi}</Link></Table.Cell>
                </Table.Row>   
                 )}              
                </Table.Body>
            </Table>
        )
    }
      
}
const mapStateToProps = (state) => {
    console.log('state', state)
    return {
     kategoriat: state.kategoriat
    }
  }
export default connect(
    mapStateToProps,
    null
  )(Kategoriat)