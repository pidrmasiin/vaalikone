import React from 'react';
import { connect } from 'react-redux'
import { htmlEdustajat, htmlPuolueet } from '../reducers/htmlReducer'
import { addPuolueet, addDetails, addEdustajat } from '../reducers/kysymysReducer'
import { Button } from 'react-bootstrap'

class HtmlForm extends React.Component {

  handlePuolueet = (e) => {
    var parser = new DOMParser();
    var doc = parser.parseFromString(this.props.html.puolueet, "text/html");
    var puolueet = []
    console.log('puolueet', doc)
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
    this.props.addPuolueet(puolueet)
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
    }
    this.props.addEdustajat(edustajat)
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
      kysymys: e.target.kysymys.value
    }
    this.props.addDetails(details)
    e.target.url.value = ''
    e.target.selitys.value = ''
    e.target.kysymys.value = ''
  }

  onSubmit = async (e) => {
    this.handleDetails(e)
    await this.handleHtml(e)
    this.handlePuolueet()
    this.handleEdustajat()
    
  }

  render() {
    console.log('this.props', this.props.kysymys)
    return (
      <div className='container'>
        <form onSubmit={this.onSubmit} id='htmlform'>
        <h2>Lisää kysymys</h2>
          <div className="form-group">
          <b>Kirjoita alle äänestyksen kohteen oleva kysmys</b>
          <input type="text" className="form-control" placeholder="kysymys" name='kysymys'/>
          </div>
          <div className="form-group">
          <b>Kirjoita  alle tarkempi kuvaus kysymyksestä</b>
          <input type="text" className="form-control" placeholder="selitys" name='selitys'/>
          </div>
          <div className="form-group">
          <b>Kirjoita  alle linkki edukunnan sivuille </b>
           <input type="text" className="form-control" placeholder="url" name='url'/>
          </div>
          <div className="form-group">
          <br></br>
          <b>Kopio alle eduskunnan sivuilta html-muotoinen table-elementti, jossa tiedot äänestyksen tuloksista eduskuntaryhmittäin. </b>
          <textarea type="text" className="form-control" 
          placeholder="<table><tbody>...</tbody></table>" 
          rows="10" cols="20" name="htmlPuolueet" form='htmlform'>
          </textarea>
          </div>
          <div>
          <b>Kopio alle eduskunnan sivuilta html-muotoinen table-elementti, jossa tiedot äänestyksen tuloksista edustajittain.</b>
          <textarea type="text" className="form-control" 
          placeholder="<table><tbody>...</tbody></table>" 
          rows="10" cols="20" name="htmlEdustajat" form='htmlform'>
          </textarea>
          </div>
          <br></br>
          <p><Button bsStyle="success"  type="submit">create</Button></p>
          
        </form>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
   html: state.html,
   kysymys: state.kysymys
  }
}

export default connect(
  mapStateToProps, 
  { htmlEdustajat, htmlPuolueet, addPuolueet, addEdustajat, addDetails }
)(HtmlForm)
