import React from 'react';
import Papa from 'papaparse';
import { connect } from 'react-redux';
import { Container, Button, Input, Dropdown } from 'semantic-ui-react'
import csv from './vanhatvastaukset.csv'
import Vastaukset from './Vastaukset';
import { addEdustaja } from '../../reducers/edustajaReducer';
import { notifyCreation } from '../../reducers/notifyReducer'

class EtsiVastaus extends React.Component {
  constructor(props) {
    super(props);
    this.updateData = this.updateData.bind(this);
    this.state = {
      array: false,
      etunimi: '',
      sukunimi: '',
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
    etsi = () => {
      /*eslint-disable */
      if(this.state.sukunimi && this.state.etunimi){
      const edustaja = this.state.array.find(x => x.sukunimi.toLowerCase().replace(/\s/g, '') === this.state.sukunimi.toLowerCase().replace(/\s/g, ''))
      /* eslint-enable */
        if (edustaja.etunimi.toLowerCase().replace(/\s/g, '') === this.state.etunimi.toLowerCase().replace(/\s/g, '')) {
          this.props.addEdustaja(edustaja)
        }
      } else {
        this.props.notifyCreation('Henkilöä ei löydy. Syötitkö sekä etu- että sukunimen?', 5)
      }
    }

    muodosta = () => {
      const nimet = this.props.kysymykset[0].edustajat.map(x => x.nimi)
      const edustajat = []
      for (let i = 0; i < nimet.length; i = i + 1) {
        const apu = nimet[i].split('/')
        let puolue = apu[1]
        switch (puolue) {
          case 'kesk':
            puolue = 'Keskustan eduskuntaryhmä'
            break
          case 'ps':
            puolue = 'Perussuomalaisten eduskuntaryhmä'
            break
          case 'kok':
            puolue = 'Kansallisen kokoomuksen eduskuntaryhmä'
            break
          case 'sd':
            puolue = 'Sosialidemokraattinen eduskuntaryhmä'
            break
          case 'vihr':
            puolue = 'Vihreä eduskuntaryhmä'
            break
          case 'vas':
            puolue = 'Vasemmistoliiton eduskuntaryhmä'
            break
          case 'r':
            puolue = 'Ruotsalainen eduskuntaryhmä'
            break
          case 'kd':
            puolue = 'Kristillisdemokraattinen eduskuntaryhmä'
            break
          default:
            break
        }
        const nimi = apu[0].toLowerCase()
        const data = {
          nimi,
          puolue,
        }
        edustajat.push(data)
      }
      const kesk = []
      const kok = []
      const sdp = []
      const vihr = []
      const vas = []
      const rkp = []
      const kd = []
      const ps = []

      const ulos = []
      for (let i = 0; i < this.state.array.length; i = i + 1) {
        const copy = this.state.array[i]
        if (copy.sukunimi && copy.etunimi) {
          const nimi = copy.sukunimi.replace(/\s/g, '') + copy.etunimi.replace(/\s/g, '')
          const edustaja = edustajat.find(x => x.nimi === nimi.toLowerCase())
          if (edustaja) {
            copy.puolue = edustaja.puolue
            switch (copy.puolue) {
              case 'Keskustan eduskuntaryhmä':
                kesk.push(copy)
                break
              case 'Perussuomalaisten eduskuntaryhmä':
                ps.push(copy)
                break
              case 'Kansallisen kokoomuksen eduskuntaryhmä':
                kok.push(copy)
                break
              case 'Sosialidemokraattinen eduskuntaryhmä':
                sdp.push(copy)
                break
              case 'Vihreä eduskuntaryhmä':
                vihr.push(copy)
                break
              case 'Vasemmistoliiton eduskuntaryhmä':
                vas.push(copy)
                break
              case 'Ruotsalainen eduskuntaryhmä':
                rkp.push(copy)
                break
              case 'Kristillisdemokraattinen eduskuntaryhmä':
                kd.push(copy)
                break
              default:
                break
            }
            ulos.push(this.state.array[i])
          }
        }
      }
      console.log('ulos', ulos)
      const puolueet = {
        kesk,
        kok,
        sdp,
        vihr,
        vas,
        rkp,
        kd,
        ps,
      }
      console.log('puolueet', puolueet)
      console.log('kd', puolueet.kd.map(x => x['127|Suomessa on liian helppo elää sosiaaliturvan varassa']))
      const kysymykset = Object.keys(ulos[0])
      console.log('kysymykste', kysymykset)
      const sliced = kysymykset.slice(37, 99)
      const filtered = sliced.filter(x => !x.includes('kommentti'))
      console.log('sliced', filtered)
    }


    updateData(result) {
      const data = result.data;
      // Here this is available and we can call this.setState (since it's binded in the constructor)
      this.setState({ array: data }); // or shorter ES syntax: this.setState({ data });
    }

    handleChange(e) {
      // If you are using babel, you can use ES 6 dictionary syntax
      // let change = { [e.target.name] = e.target.value }
      const change = {}
      change[e.target.name] = e.target.value
      this.setState(change)
    }


    render() {
      const friendOptions = [
          {
            text: 'Jenny Hess',
            value: 'Jenny Hess',
          },
        ]
      return (
        <Container>
          <Button positive onClick={this.muodosta} className="fluid ui button">Muodosta</Button>
          <h1>Mitä tuli luvattua?</h1>
          <p>
          Täältä voit etsiä yksittäisten kansanedustajien/ehdokkaiden vastauksia ylen vaalikoneeseen
          </p>
          <Input type="text" onChange={this.handleChange.bind(this)} className="form-control" placeholder="Juha" name="etunimi" label="Etunimi" />
          <Input type="text" onChange={this.handleChange.bind(this)} className="form-control" placeholder="Sipilä" name="sukunimi" label="Sukunimi" />
          <br />
          <p><Button positive onClick={this.etsi}>Tarkastele vastauksia</Button></p>
          <br />
          <Vastaukset />
          <div style={{ background: 'AliceBlue' }}>
            <h1>Mitä Kysyttiin?</h1>
            <p>
           Täältä löydät kansanedustajien vastaukset yksittäisiin kysymyksiin
            </p>
            <Dropdown placeholder="Valitse kysymys" fluid search selection options={friendOptions} />
            <br />
            <p><Button positive onClick={this.muodosta}>Tarkastele vastauksia</Button></p>
            <br />
          </div>
        </Container>
      )
    }
}

const mapStateToProps = state => ({
  edustaja: state.edustaja,
  kysymykset: state.kysymykset,
});

export default connect(
  mapStateToProps,
  { addEdustaja, notifyCreation },
)(EtsiVastaus);
