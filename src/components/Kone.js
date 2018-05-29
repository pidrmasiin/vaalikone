import React from 'react';
import { connect } from 'react-redux';
import { Button, Item, Grid, Header, Divider } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { addVastaus, addKysymys } from '../reducers/kayttajaReducer';
import VastausTable from './form/VastausTable';

class Kone extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      kysymykset: [],
      kysymys: null,
      show: false,
      tulokset: false,
    };
  }

  componentDidMount = () => {
    const apu = this.props.kysymykset
    const uusiKysymys = apu[Math.floor(Math.random() * apu.length)];
    const copy = this.state.kysymykset;
    const ehto2 = copy.find(x => x.kysymys === uusiKysymys.kysymys)
    const ehto = this.props.kayttaja.kysymykset.filter(k => k.kysymys === uusiKysymys.kysymys)
    if (this.state.kysymykset.length === 0) {
      copy.push(uusiKysymys);
      this.setState({
        kysymys: uusiKysymys,
        kysymykset: copy,
      });
    } else if (ehto.length === 0 && !ehto2) {
      copy.push(uusiKysymys);
      this.setState({
        kysymys: uusiKysymys,
        kysymykset: copy,
      });
    }
  }
  show = () => {
    this.setState({
      show: !this.state.show,
    });
  }

  tulokset= () => {
    this.setState({
      tulokset: !this.state.tulokset,
    });
  }

  vastaus = (vastaus) => {
    this.props.addKysymys(this.state.kysymys);
    const jaaPuolueet = this.state.kysymys.puolueet.filter(p => p.kanta === vastaus);
    const help = this.props.kayttaja.kysymykset.find(x => x.kysymys === this.state.kysymys.kysymys)
    if (!help) {
      for (let i = 0; i < jaaPuolueet.map(p => p.nimi).length; i = i + 1) {
        this.props.addVastaus(jaaPuolueet.map(p => p.nimi)[i]);
      }
    }
    this.componentDidMount();
  }

  render() {
    const visible = { display: this.state.show ? '' : 'none' };
    const tulokset = { display: this.state.tulokset ? '' : 'none' };

    if (this.props.kayttaja.kysymykset.length === this.props.kysymykset.length) {
      return (
        <div>
          <h1>Kysymykset ja tulokset</h1>
          <Button onClick={this.show} size="mini" inverted color="blue">Näytä/piilota kysymykset</Button>
          {this.state.show && this.props.kayttaja.kysymykset.map(k =>
            <Item style={{ background: 'AliceBlue' }}key={k.id}><Link to={`/kysymykset/${k.id}`}>{k.kysymys}</Link><Divider /></Item>)}
          <VastausTable />
        </div>
      );
    }
    if (!this.state.kysymys) {
      // window.location.assign('/')
      return (
        <div />
      )
    }
    const help = this.props.kayttaja.kysymykset.find(x => x.kysymys === this.state.kysymys.kysymys)
    if (help) {
      this.componentDidMount()
    }
    return (
      <Grid style={{ background: '#eff5f5' }}>
        <Grid.Row />
        <Grid.Row>
          <Grid.Column width={1} />
          <Grid.Column width={3}>
            <Header as="h1" textAlign="justified">M i t ä</Header>
          </Grid.Column>
          <Grid.Column width={1} />
          <Grid.Column width={3}>
            <Header as="h1" textAlign="justified"> o l e t</Header>
          </Grid.Column>
          <Grid.Column width={1} />
          <Grid.Column width={4}>
            <Header as="h1" textAlign="justified"> m i e l t ä</Header>
          </Grid.Column>
          <Grid.Column width={3}>
            <Header as="h1" textAlign="justified">?</Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={1} />
          <Grid.Column width={9}>
            <Item>
              <Item.Content>
                <Item.Header><h2>{this.props.kayttaja.kysymykset.length + 1}. {this.state.kysymys.kysymys} <Button onClick={this.show} size="mini" basic>Lisätietoja</Button></h2></Item.Header>
                <Item.Description style={visible}>
                  <ul>
                    <li>{this.state.kysymys.selitys}</li>
                    <li>{this.state.kysymys.vuosi}</li>
                    <li><a href={this.state.kysymys.url}>{this.state.kysymys.url}</a></li>
                  </ul>
                </Item.Description>
              </Item.Content>
            </Item>
          </Grid.Column>
          <Grid.Column width={6} />
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={4} />
          <Grid.Column width={12}>
            <Button onClick={() => this.vastaus('jaa')} size="big" inverted color="green">Jaa</Button>
            <Button onClick={() => this.vastaus('eos')} size="big" inverted color="brown">EOS/tyhjä</Button>
            <Button onClick={() => this.vastaus('ei')} size="big" inverted color="red">Ei</Button>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row >
          <Grid.Column width={1} />
          <Grid.Column width={12}>
            <Item>
              <Item.Content>
                <Button onClick={this.tulokset} fluid basic>Piilota/näytä tulokset</Button>
                <Item.Description style={tulokset}>
                  <VastausTable />
                </Item.Description>
              </Item.Content>
            </Item>
          </Grid.Column>
          <Grid.Column width={3} />
        </Grid.Row>
        <Grid.Row />
        <Grid.Row />
      </Grid>
    );
  }
}


const mapStateToProps = state => ({
  kysymykset: state.kysymykset,
  kayttaja: state.kayttaja,
});

export default connect(
  mapStateToProps,
  { addVastaus, addKysymys },
)(Kone);

