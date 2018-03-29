import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Button, Item, Grid, Header } from 'semantic-ui-react'

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
      kysymys: {kysymys: 'Etusivun kautta'},
      show: false
    }
  }

  componentWillMount = () => {
    if(this.props.kysymykset.length !== 0){
      this.setState({
        kysymys: this.props.kysymykset[Math.floor(Math.random()*this.props.kysymykset.length)]
      })
    }
  }

  show = () => {
      this.setState({
        show: !this.state.show
      })
  }

    
    render(){
      const visible = { display: this.state.show ? '' : 'none' }
    return(
      <Grid>
        <Grid.Row>
        <Grid.Column width={16}>
        </Grid.Column>
        </Grid.Row>
        <Grid.Row>
        <Grid.Column width={1}>
        </Grid.Column>
        <Grid.Column width={4}>
        <Header as='h1' style={navStyle} textAlign='justified'>M i t ä</Header>
        </Grid.Column>
        <Grid.Column width={4}>
        <Header as='h1' style={qStyle} textAlign='justified'> o l e t</Header>
        </Grid.Column>
        <Grid.Column width={4}>
        <Header as='h1' style={navStyle} textAlign='justified'> m i e l t ä</Header>
        </Grid.Column>
        <Grid.Column width={3}>
        <Header as='h1' style={qStyle} textAlign='justified'>?</Header>
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
          <Grid.Column width={2}>
          </Grid.Column>
          <Grid.Column width={14}>
          <Button size='big' inverted color='green'>Jaa</Button>
          <Button size='big' color='grey'>EOS/tyhjä</Button>
          <Button size='big' inverted color='red'>Ei</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
  
}

const mapStateToProps = (state) => {
    return {
     kysymykset: state.kysymykset
    }
  }
  
  export default connect(
    mapStateToProps
  )(Kone)