import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Button, Item, Grid, Header, Table } from 'semantic-ui-react'
import { addVastaus, addKysymys } from '../reducers/kayttajaReducer'
import VastausTable from './form/VastausTable'


const navStyle = {
  color: '#ffe6e6',
}

const qStyle = {
  color: '#e6fff7',
}



class Kone extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      kysymys: null,
      show: false,
      tulokset: false
    }
  }

  componentWillMount = () => {
    if(this.props.kysymykset.length !== 0){
      const uusiKysymys = this.props.kysymykset[Math.floor(Math.random()*this.props.kysymykset.length)]
      this.props.addKysymys(uusiKysymys)
      this.setState({
        kysymys: uusiKysymys
      })
    }
  }

  show = () => {
      this.setState({
        show: !this.state.show
      })
  }

  tulokset= () => {
    this.setState({
      tulokset: !this.state.tulokset
    })
  }

  jaa = () => {
    
    const userKysymys = this.props.kayttaja.kysymykset.filter(k => k.id === this.state.kysymys.id)
    if(!userKysymys[0].vastaus){
    userKysymys[0].vastaus = 'jaa'
    this.props.addKysymys(userKysymys[0])
    const jaaPuolueet = userKysymys[0].puolueet.filter(p => p.kanta === 'jaa')
    for (let i = 0; i < jaaPuolueet.map(p => p.nimi).length; i += 1) {
      this.props.addVastaus(jaaPuolueet.map(p => p.nimi)[i])
    }
    }
    
    this.componentWillMount()
  }

  eos = () => {
    const userKysymys = this.props.kayttaja.kysymykset.filter(k => k.id === this.state.kysymys.id)
    if(!userKysymys[0].vastaus){
    userKysymys[0].vastaus = 'tyhjia'
    this.props.addKysymys(userKysymys[0])
    const jaaPuolueet = userKysymys[0].puolueet.filter(p => p.kanta === 'tyhjia')
    for (let i = 0; i < jaaPuolueet.map(p => p.nimi).length; i += 1) {
      this.props.addVastaus(jaaPuolueet.map(p => p.nimi)[i])
    }
    }
    
    this.componentWillMount()
  }

  ei = () => {
    const userKysymys = this.props.kayttaja.kysymykset.filter(k => k.id === this.state.kysymys.id)
    if(!userKysymys[0].vastaus){
    userKysymys[0].vastaus = 'ei'
    this.props.addKysymys(userKysymys[0])
    const jaaPuolueet = userKysymys[0].puolueet.filter(p => p.kanta === 'ei')
    for (let i = 0; i < jaaPuolueet.map(p => p.nimi).length; i += 1) {
      this.props.addVastaus(jaaPuolueet.map(p => p.nimi)[i])
    }
    }
    
    this.componentWillMount()
  }

    
    render(){
      const visible = { display: this.state.show ? '' : 'none' }
      const tulokset = { display: this.state.tulokset ? '' : 'none' }
      console.log('this.User', this.props.kayttaja)
      if(this.state.kysymys){
       
    return(
      <Grid>
        <Grid.Row>
        <Grid.Column width={1}>
        </Grid.Column>
        <Grid.Column width={4}>
        <Header as='h1' style={navStyle} textAlign='justified'>M i t ä</Header>
        </Grid.Column>
        <Grid.Column width={4}>
        <Header as='h1' style={qStyle} textAlign='justified'> </Header>
        </Grid.Column>
        <Grid.Column width={4}>
        <Header as='h1' style={navStyle} textAlign='justified'></Header>
        </Grid.Column>
        <Grid.Column width={3}>
        <Header as='h1' style={qStyle} textAlign='justified'></Header>
        </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={1}>
          </Grid.Column>
          <Grid.Column width={9}>
          <Item>
            <Item.Content>
              <Item.Header><h2>{this.state.kysymys.selitys} <Button onClick={this.show} size='mini' basic color='teal'>Lisätietoja</Button></h2></Item.Header>
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
          <Grid.Column width={6}>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
        <Grid.Column width={16}>
        </Grid.Column>
        </Grid.Row>
        <Grid.Row>
        <Grid.Column width={2}>
        </Grid.Column>
        <Grid.Column width={4}>
        <Header as='h1' style={qStyle} textAlign='justified'> o l e t</Header>
        </Grid.Column>
        <Grid.Column width={3}>
        <Header as='h1' style={qStyle} textAlign='justified'> </Header>
        </Grid.Column>
        <Grid.Column width={4}>
        <Header as='h1' style={navStyle} textAlign='justified'> m i e l t ä</Header>
        </Grid.Column>
        <Grid.Column width={3}>
        <Header as='h1' style={qStyle} textAlign='justified'>?</Header>
        </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={4}>
          </Grid.Column>
          <Grid.Column width={12}>
          <Button onClick={this.jaa} size='big'inverted color='green'>Jaa</Button>
          <Button onClick={this.eos} size='big' color='grey'>EOS/tyhjä</Button>
          <Button onClick={this.ei} size='big' inverted color='red'>Ei</Button>
          </Grid.Column>
        </Grid.Row>
       
        <Grid.Row >
          <Grid.Column width={1}>
          </Grid.Column>
          <Grid.Column width={12}>
          <Item>
            <Item.Content>
              <Button onClick={this.tulokset} fluid basic color='teal'>Piilota/näytä tulokset</Button>
              <Item.Description style={tulokset}> 
              <VastausTable/>
              </Item.Description>
            </Item.Content>
          </Item>
          </Grid.Column>
          <Grid.Column width={3}>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
  return null
}
  
}

const mapStateToProps = (state) => {
    return {
     kysymykset: state.kysymykset,
     kayttaja: state.kayttaja
    }
  }
  
  export default connect(
    mapStateToProps,
    { addVastaus, addKysymys }
  )(Kone)