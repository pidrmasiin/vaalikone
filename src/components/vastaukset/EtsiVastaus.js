import React from 'react';
import Papa from 'papaparse';
import { connect } from 'react-redux';
import { Container, Button, Table } from 'semantic-ui-react'
import csv from './vanhatvastaukset.csv'
import FormInput from '../form/FormInput';
import Vastaukset from './Vastaukset';
import { addEdustaja } from '../../reducers/edustajaReducer';


class EtsiVastaus extends React.Component {
  constructor(props) {
    super(props);
    this.updateData = this.updateData.bind(this);
    this.state = {
      array: false,
    };
  }

    componentDidMount = async () => {
      // Parse CSV string
      Papa.parse(csv, {
        header: true,
        download: true,
        complete: this.updateData,
      })
    }
    onSubmit = (e) => {
      console.log('mo')
      const edustaja = this.state.array.find(x => x.sukunimi === e.target.sukunimi.value)
      if (edustaja.etunimi === e.target.etunimi.value) {
        this.props.addEdustaja(edustaja)
      }
    }
    updateData(result) {
      const data = result.data;
      // Here this is available and we can call this.setState (since it's binded in the constructor)
      this.setState({ array: data }); // or shorter ES syntax: this.setState({ data });
    }


    render() {
      console.log('proops', this.props)
      if (this.props.edustaja) {
        const sliced = this.state.array.slice(0, 99)
        return (
          <Vastaukset sliced={sliced} />
        )
      }
      return (
        <Container>
          <h1>Mitä tuli luvattua?</h1>
          <p> Täältä voit etsiä yksittäisten kansanedustajien vastauksia ylen vaalikoneeseen</p>
          <form onSubmit={this.onSubmit} id="htmlform">
            <FormInput placeholder="Etunimi" name="etunimi" label="Etunimi" />
            <FormInput placeholder="Sukunimi" name="sukunimi" label="Sukunimi" />
            <br />
            <p><Button positive type="submit" className="fluid ui button">Tarkastele vastauksia</Button></p>
          </form>
        </Container>
      )
    }
}

const mapStateToProps = state => ({
  edustaja: state.edustaja,
});

export default connect(
  mapStateToProps,
  { addEdustaja },
)(EtsiVastaus);