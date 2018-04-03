import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table, Button } from 'semantic-ui-react'
import kysymysService from '../services/kysymys'

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
    remove =(k) => {

        return() => {
        const ok = window.confirm(`Poistetaanko ` + k.kysymys + ' kysymys')
    
        if (!ok) {
          return
        }
        try{
            const loggedUserJSON = window.localStorage.getItem('loggedUser')
            kysymysService.setToken(JSON.parse(loggedUserJSON).token)
            kysymysService.remove(k.id)
        }catch(error) {
         console.log('jotain meni vikaan')
         }
      }
      }

    render() {
        return(
            <Table celled color='teal' selectable>
                <Table.Header>
                <Table.Row>
                <Table.HeaderCell positive>Kysymys</Table.HeaderCell>
                {window.localStorage.getItem('loggedUser') === null ?
                <Table.HeaderCell></Table.HeaderCell> : <Table.HeaderCell>Poisto</Table.HeaderCell>}
                </Table.Row>
                </Table.Header>
                <Table.Body>
                {this.props.kysymykset.map(k => 
                <Table.Row key={k.id}>
                <Table.Cell><Link style={linkStyle} to={`/kysymykset/${k.id}`}>{k.kysymys}</Link></Table.Cell>
                <Table.Cell>{window.localStorage.getItem('loggedUser') === null ?
                null : <form onSubmit={this.remove(k)}><Button inverted color='red' type="submit">Delete</Button></form>}</Table.Cell>
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