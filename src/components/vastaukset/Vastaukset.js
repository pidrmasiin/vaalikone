import React from 'react';
import { connect } from 'react-redux';
import { Container, Table, Header, Button } from 'semantic-ui-react'


class Vastaukset extends React.Component {
  state={
    tiedot: false,
  }
    componentDidMount = () => {
    }

    nayta = () => {
      this.setState({
        tiedot: !this.state.tiedot,
      })
    }
    render() {
      const edustaja = this.props.edustaja
      const kysymykset = Object.keys(edustaja)
      const tiedot = kysymykset.slice(0, 36)
      const sliced = kysymykset.slice(37, 99)
      return (
        <Container style={{ background: '#eff5f5' }}>
          <Header>{edustaja.etunimi}{' '}{edustaja.sukunimi}</Header>
          <p>Vastaukset ylen vaalikoneeseen</p>
          <Button onClick={this.nayta} inverted color="blue"> {!this.state.tiedot ?
            <p>Näytä edustajan</p> : <p>Piilota </p>}
          taustatiedot
          </Button>
          {this.state.tiedot &&
          <Table celled style={{ background: 'AliceBlue' }}>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell style={{ background: 'DeepSkyBlue' }}>Kohta</Table.HeaderCell>
                <Table.HeaderCell>Vastaus</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {tiedot.map(x =>
              (
                <Table.Row key={x}>
                  <Table.Cell>{x}</Table.Cell>
                  <Table.Cell>{edustaja[x]}</Table.Cell>
                </Table.Row>
                ))}
            </Table.Body>
            <Button onClick={this.nayta} inverted color="blue">Piilota taustatiedot
            </Button>
          </Table>
          }
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
                <Table.Row key={x}>
                  <Table.Cell>{x}</Table.Cell>
                  <Table.Cell>{edustaja[x]}</Table.Cell>
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

