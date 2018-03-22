import React from 'react';
import { ListGroupItem } from 'react-bootstrap'

const Kysymys = ({ kysymys }) => {
  console.log('kysymys', kysymys)
  if(kysymys){
    return (
      <div className="container"> 
      <h2><b>{kysymys.kysymys}</b></h2> 
      <ListGroupItem bsStyle="info" header="Selitys">
      {kysymys.selitys}
      </ListGroupItem>
      <ListGroupItem target="_blank" header="Linkki eduskunnan sivuille" href={kysymys.url}>
      {kysymys.url}
      </ListGroupItem>
      </div>
    )
  }else {
    return null
  }
  
}
    

  export default Kysymys