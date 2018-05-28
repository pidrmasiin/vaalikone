import React from 'react';
import { connect } from 'react-redux';
import { Container, Table } from 'semantic-ui-react'


class Vastaukset extends React.Component {

    componentDidMount = () => {
    }


    render() {
      console.log('state', this.props)
      const edustaja = this.props.edustaja
      const sliced = this.props.sliced
      console.log('edustaja', edustaja)
      console.log('edustaja', sliced)
      return (
        <Container style={{ background: '#eff5f5' }}>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Kysymys</Table.HeaderCell>
                <Table.HeaderCell>Vastaus</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {sliced.map(x =>
              (
                <Table.Row>
                  <Table.Cell>{x}</Table.Cell>
                  <Table.Cell></Table.Cell>
                </Table.Row>
                ))}
            </Table.Body>
          </Table>
        </Container>
      )
    }
}

const mapStateToProps = state => ({
  edustaja: state.edustaja,
});

export default connect(
  mapStateToProps,
  null,
)(Vastaukset);

