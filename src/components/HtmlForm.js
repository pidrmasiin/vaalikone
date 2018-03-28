import React from 'react';
import { connect } from 'react-redux'
import FormInput from './form/FormInput'
import TextArea from './form/TextArea'
import { htmlEdustajat, htmlPuolueet } from '../reducers/htmlReducer'
import { addPuolueet, addDetails, addEdustajat } from '../reducers/kysymysReducer'
import { notifyCreation } from '../reducers/notifyReducer'
import { Button } from 'semantic-ui-react'
import Notification from './Notification'
import kysymysService from '../services/kysymys'

class HtmlForm extends React.Component {

  handlePuolueet = (e) => {
    var parser = new DOMParser();
    var doc = parser.parseFromString(this.props.html.puolueet, "text/html");
    var puolueet = []
    if(this.props.html.puolueet !== ''){
    const rows = doc.getElementsByTagName("TBODY")[0].rows;
    for (let i = 1; i < rows.length; i += 1) {
      const puolue = {
        nimi: rows[i].cells[0].innerHTML,
        jaa: Number(rows[i].cells[1].innerHTML.replace(/\s/g, '')),
        ei: Number(rows[i].cells[2].innerHTML.replace(/\s/g, '')),
        tyhjia: Number(rows[i].cells[3].innerHTML.replace(/\s/g, '')),
        poissa: Number(rows[i].cells[4].innerHTML.replace(/\s/g, '')),
      };
      puolue.kanta = Object.keys(puolue).reduce((a, b) => (puolue[a] > puolue[b] ? a : b));
      puolue.yhteensa = Number(rows[i].cells[5].innerHTML.replace(/\s/g, ''));
      if (puolueet.filter(p => p.nimi === puolue.nimi).length === 0) {
        puolueet.push(puolue)
        }
      }
    }
    if(puolueet.length > 5 && puolueet.length < 10){
    this.props.notifyCreation("Kannat lisätty", 5)
    this.props.addPuolueet(puolueet)
    }else{
      this.props.notifyCreation("Tapahtui virhe", 5)
    }
  }

  handleEdustajat = (e) => {
    var parser = new DOMParser();
    var doc = parser.parseFromString(this.props.html.edustajat, "text/html");
    var edustajat = []
    if(this.props.html.edustajat !== ''){
    const rows = doc.getElementsByTagName("TBODY")[0].rows;
    for (let i = 1; i < rows.length; i += 1) {
      const edustaja = {
        nimi: rows[i].cells[0].innerHTML.replace(/\s/g, ''),
        kanta: rows[i].cells[1].innerHTML.replace(/\s/g, ''),
        
      };
      if (edustajat.filter(p => p.nimi === edustaja.nimi).length === 0) {
        edustajat.push(edustaja)
        }
      }
    }if(edustajat.length > 190 && edustajat.length < 201){
      this.props.notifyCreation("Kannat lisätty", 5)
      this.props.addEdustajat(edustajat)
      }
    else{
      this.props.notifyCreation("Tapahtui virhe", 5)
    }
  }

  handleHtml = (e) => {
    e.preventDefault()
    const edustajat = e.target.htmlEdustajat.value
    this.props.htmlEdustajat(edustajat)
    const puolueet = e.target.htmlPuolueet.value
    this.props.htmlPuolueet(puolueet)
    e.target.htmlPuolueet.value = ''
    e.target.htmlEdustajat.value = ''
  }

  handleDetails = (e) => {
    e.preventDefault()
    const details = {
      url: e.target.url.value,
      selitys: e.target.selitys.value,
      kysymys: e.target.kysymys.value,
      vuosi: e.target.vuosi.value
    }
    this.props.addDetails(details)
    e.target.url.value = ''
    e.target.selitys.value = ''
    e.target.kysymys.value = ''
    e.target.vuosi.value = ''
  }

  onSubmit = async (e) => {
    this.handleDetails(e)
    await this.handleHtml(e)
    this.handlePuolueet()
    this.handleEdustajat()
    if(this.props.notify !== "Tapahtui virhe"){
      try {
        await kysymysService.addKysymys(this.props.kysymys)
        this.props.history.push('/')
      } catch (exception){
        this.props.notifyCreation("Tapahtui virhe", 5)
      }
    }
  }

  render() {
    console.log('this.props', this.props.kysymys)

    return (
      <div className='container'>
        <form onSubmit={this.onSubmit} id='htmlform'>
        <h2>Lisää kysymys</h2>
          <FormInput label="Kirjoita alle äänestyksen kohteen oleva kysymys" placeholder="kysymys" name='kysymys'/>
          <FormInput label="Tapahtuma vuosi" placeholder="2018" name='vuosi'/>
          <FormInput label="Linkki edukunnan sivuille" placeholder="url" name='url'/>
          <TextArea label="Tarkempi kuvaus kysymyksestä" placeholder="selitys" name='selitys'/>
          <br></br>
          <Notification />
          <TextArea placeholder="<table><tbody>...</tbody></table>" name="htmlPuolueet" 
          label="Kopio alle eduskunnan sivuilta html-muotoinen table-elementti, jossa tiedot äänestyksen tuloksista eduskuntaryhmittäin."/>
          <br></br>
          <TextArea  placeholder="<table><tbody>...</tbody></table>" name="htmlEdustajat" 
          label="Kopio alle eduskunnan sivuilta html-muotoinen table-elementti, jossa tiedot äänestyksen tuloksista edustajittain."/>
          <br></br>
         
          <p><Button positive type="submit" className="fluid ui button">create</Button></p>
          <br></br>
        </form>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
   html: state.html,
   kysymys: state.kysymys,
   notify: state.notify
  }
}

export default connect(
  mapStateToProps, 
  { htmlEdustajat, htmlPuolueet, addPuolueet, addEdustajat, addDetails, notifyCreation }
)(HtmlForm)
