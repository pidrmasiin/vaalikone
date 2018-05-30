import React from 'react';
import { connect } from 'react-redux';
import { Table } from 'semantic-ui-react'

class Kannat extends React.Component {
  componentWillUpdate = () => {
  }
  render() {
    const map = []
    for (let k = 0; k < this.props.kayttaja.kysymykset.length; k = k + 1) {
      const puolueet = this.props.kayttaja.kysymykset[k].puolueet
      for (let i = 0; i < puolueet.length; i = i + 1) {
        if (puolueet[i].nimi === this.props.kayttaja.puolue) {
          const data = {
            kanta: puolueet[i].kanta,
            kysymys: this.props.kayttaja.kysymykset[k].kysymys,
          }
          if (!map.find(p => p.kysymys === data.kysymys)) {
            map.push(data)
          }
        }
      }
    }
    return (
      <div>
        <h1 style={{ background: '#ffc180' }}>{this.props.kayttaja.puolue}</h1>
        <Table celled id="table" style={{ background: '#ffe6cc' }}>

          <Table.Header>
            <Table.Row>
              <Table.HeaderCell positive>Kysymys</Table.HeaderCell>
              <Table.HeaderCell>
              Kanta
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.props.kayttaja.kysymykset.map(x =>
           (
             <Table.Row key={x.id}>
               <Table.Cell>  {x.kysymys}</Table.Cell>
               <Table.Cell>{map.find(k => k.kysymys === x.kysymys).kanta}</Table.Cell>
             </Table.Row>))}
          </Table.Body>
        </Table>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  kysymykset: state.kysymykset,
  kayttaja: state.kayttaja,
});

export default connect(
  mapStateToProps,
  { },
)(Kannat);

