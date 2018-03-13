import React from 'react';
import { connect } from 'react-redux'
import { initialize } from '../reducers/htmlReducer'
import { addPuolueet, addDetails } from '../reducers/kysymysReducer'
import { Button } from 'react-bootstrap'

class HtmlForm extends React.Component {

  handlePuolueet = (e) => {

    var parser = new DOMParser();
    var doc = parser.parseFromString(this.props.html, "text/html");
    var puolueet = []
    if(this.props.html !== ''){
    const rows = doc.getElementById("myTable").rows;
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

  handleHtml = (e) => {
    e.preventDefault()
    const content = e.target.html.value
    this.props.initialize(content)
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
    
  }

  render() {
    console.log('this.props', this.props.kysymys)
    return (
      <div className='container'>
        <form onSubmit={this.onSubmit} id='htmlform'>
        <h2>Lisää kysymys</h2>
          <div className="form-group">
          <input type="text" className="form-control" placeholder="kysymys" name='kysymys'/>
          </div>
          <div className="form-group">
          <input type="text" className="form-control" placeholder="selitys" name='selitys'/>
          </div>
          <div className="form-group">
           <input type="text" className="form-control" placeholder="url" name='url'/>
          </div>
          <div className="form-group">
          <br></br>
          <p>Kopio alle table-elementti html muodossa äänestyksestä eduskuntaryhmittäin ja paina sitten create<br></br>
          <b>Huom! </b>Lisää myös tbody tagiin: id="myTable"</p>
          <p><Button bsStyle="success"  type="submit">create</Button></p>
          <textarea type="text" className="form-control" 
          placeholder="<table><tbody id='myTable'><tr>..<tr></tbody></table>" 
          rows="50" cols="100" name="html" form='htmlform'>
          </textarea>
          </div>
          
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

export default connect(mapStateToProps, { initialize, addPuolueet, addDetails })(HtmlForm)
