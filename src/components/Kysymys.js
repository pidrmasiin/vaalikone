import React from 'react';
import { Item } from 'semantic-ui-react'

const Kysymys = ({ kysymys }) => {
  console.log('kysymys', kysymys)
  if(kysymys){
    return (
      <div className="container"> 
      <Item.Group>
      <Item>
      <Item.Content>
      <Item.Header>{kysymys.kysymys}</Item.Header>
      <Item.Description>
      {kysymys.selitys}
      </Item.Description>
      </Item.Content>
      </Item>
      <Item target="_blank" href={kysymys.url}>
      {kysymys.url}
      </Item>
      </Item.Group>
     
      
      </div>
    )
  }else {
    return null
  }
  
}
    

  export default Kysymys