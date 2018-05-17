import React from 'react';
import { Item, Container, List, Button, Grid, Checkbox, TextArea, Divider } from 'semantic-ui-react'
import { connect } from 'react-redux'
import kysymysService from './../../services/kysymys'

class Kysymys extends React.Component {
  state = {
    kategoriat: false,
    muokkaa: false,
    muokattava: null,
  }

  onSubmit = async (e) => {
    const kysymys = this.props.kysymys
    if (this.state.muokattava === 'kysymys') {
      kysymys.kysymys = e.target.muutos.value
    } if (this.state.muokattava === 'selitys') {
      kysymys.selitys = e.target.muutos.value
    } if (this.state.muokattava === 'url') {
      kysymys.url = e.target.muutos.value
    }
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    kysymysService.setToken(JSON.parse(loggedUserJSON).token)
    await kysymysService.modifyKysymys(kysymys.id, kysymys)
  }
  onKategoriat = async () => {
    const kategoriat = []
    this.props.kategoriat.map(k => (document.getElementById(k.nimi).checked
      ? kategoriat.push(k) : null))

    const kysymys = this.props.kysymys
    kysymys.kategoriat = kategoriat.map(x => x.id)
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    kysymysService.setToken(JSON.parse(loggedUserJSON).token)
    await kysymysService.modifyKysymys(kysymys.id, kysymys)
  }

  kategoriat = () => {
    this.setState({
      kategoriat: true,
      muokkaa: false,
    })
  }

  muokkaa = (x) => {
    this.setState({
      muokkaa: true,
      kategoriat: false,
      muokattava: x,
    })
  }
  render() {
    if (this.props.kysymys) {
      return (
        <Container style={{ background: '#eff5f5' }}>
          <Grid>

            {window.localStorage.getItem('loggedUser') &&
            <div>
              <Grid.Row>
                <Grid.Column width={4} />
                <Grid.Column width={12}>
                  <Button.Group inverted color="blue">
                    <Button onClick={() => this.muokkaa('kysymys')}>Kysymys</Button>
                    <Button.Or />
                    <Button onClick={() => this.muokkaa('selitys')}>Selitys</Button>
                    <Button.Or />
                    <Button onClick={this.kategoriat}>Kategoriat</Button>
                    <Button.Or />
                    <Button onClick={() => this.muokkaa('url')}>Linkki</Button>
                  </Button.Group>
                </Grid.Column>
              </Grid.Row>

              {this.state.kategoriat &&
              <Grid.Row>
                <form onSubmit={this.onKategoriat}>
                  {this.props.kategoriat.map(k =>
                  (<Checkbox
                    key={k.nimi}
                    label={k.nimi}
                    name="kategoriat"
                    id={k.nimi}
                  />))}
                  <br />
                  <Button type="submit" color="green">Muokkaa</Button>
                </form>
              </Grid.Row>}
              {this.state.muokkaa &&
              <form onSubmit={this.onSubmit}>
                <Grid.Row>
                  <TextArea name="muutos" />
                </Grid.Row>
                <Button type="submit" color="green">Muokkaa {this.state.muokattava}</Button>
              </form>}
            </div>}
            <Grid.Row>
              <Grid.Column width={12}>
                <Item.Group divided>
                  <Divider>Kysymys</Divider>
                  <Item>
                    <Item.Content>
                      <Item.Header>{this.props.kysymys.kysymys} </Item.Header>
                      <Item.Description>
                        {this.props.kysymys.selitys}
                      </Item.Description>
                      <List>
                        <b>Kategoriat</b>
                        <List.List>
                          {this.props.kysymys.kategoriat.map(x =>
                            <List.Item as="li" key={x._id}>{x.nimi}</List.Item>)}
                        </List.List>
                      </List>
                      <Item.Extra>
                        <a href={this.props.kysymys.url}>{this.props.kysymys.url}</a>
                      </Item.Extra>
                    </Item.Content>
                  </Item>
                </Item.Group>
              </Grid.Column>
              <Grid.Column width={3}>
                <Grid.Row />

              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      )
    }
    return (
      <div />
    )
  }
}

const mapStateToProps = state => ({
  kategoriat: state.kategoriat,
})

export default connect(
  mapStateToProps,
  {
  },
)(Kysymys)
