import _ from 'lodash'
import React from 'react';
import { Table } from 'semantic-ui-react'
import { connect } from 'react-redux'


class VastausTable extends React.Component {
    componentDidMount = () => {
    }
    render() {
      const monta = this.props.kayttaja.kysymykset.length - 1
      return (
        <Table celled id="table">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell positive>Eduskuntaryhmä</Table.HeaderCell>
              <Table.HeaderCell>
                  Monta kertaa samaa mieltä ({monta} kysymystä näytetty)
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {_.orderBy(this.props.kayttaja.puolueet, ['aanet'], ['desc']).map(x =>
              (
                <Table.Row key={x.name}>
                  <Table.Cell>{x.name}</Table.Cell>
                  <Table.Cell>{x.aanet}</Table.Cell>
                </Table.Row>))}
          </Table.Body>
        </Table>
      )
    }
}

const mapStateToProps = state => ({
  kayttaja: state.kayttaja,
})

export default connect(mapStateToProps)(VastausTable)
