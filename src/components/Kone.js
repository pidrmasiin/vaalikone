import React from 'react';
import { connect } from 'react-redux';
import { Button, Item, Grid, Header } from 'semantic-ui-react';
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

  componentWillMount = () => {
    if (this.props.kysymykset.length !== 0) {
      if (this.props.kysymykset.length !== this.props.kayttaja.kysymykset.length) {
        const apu = this.props.kysymykset;
        const uusiKysymys = apu[Math.floor(Math.random() * apu.length)];
        this.props.addKysymys(uusiKysymys);
        if (this.state.kysymykset.filter(k => k.kysymys === uusiKysymys.kysymys).length < 1) {
          const copy = this.state.kysymykset;
          copy.push(uusiKysymys);
          this.setState({
            kysymys: uusiKysymys,
            kysymykset: copy,
          });
        } else {
          this.componentWillMount();
        }
      }
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
    const userKysymys = this.props.kayttaja.kysymykset.filter(k => k.id === this.state.kysymys.id);
    if (!userKysymys[0].vastaus) {
      userKysymys[0].vastaus = vastaus;
      this.props.addKysymys(userKysymys[0]);
      const jaaPuolueet = userKysymys[0].puolueet.filter(p => p.kanta === 'jaa');
      for (let i = 0; i < jaaPuolueet.map(p => p.nimi).length; i = i + 1) {
        this.props.addVastaus(jaaPuolueet.map(p => p.nimi)[i]);
      }
    }
    this.componentWillMount();
  }

  render() {
    const visible = { display: this.state.show ? '' : 'none' };
    const tulokset = { display: this.state.tulokset ? '' : 'none' };

    if (this.props.kayttaja.kysymykset.length === this.props.kysymykset.length) {
      return (
        <div>
          <h3>
            Olet vastannut kaikkiin kysymyksiin. Uudelleen lataa sivu, jos haluat vastata uudelleen.
          </h3>
          <h3>Tulokset:</h3>
          <VastausTable />
        </div>
      );
    }
    if (!this.state.kysymys) {
      window.location.assign('/')
      return (
        <div />
      )
    }
    return (
      <Grid>
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
                <Item.Header><h2>{this.props.kayttaja.kysymykset.length}. {this.state.kysymys.selitys} <Button onClick={this.show} size="mini" basic>Lisätietoja</Button></h2></Item.Header>
                <Item.Description style={visible}>
                  <ul>
                    <li>{this.state.kysymys.kysymys}</li>
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

