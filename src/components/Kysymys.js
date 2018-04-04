import React from 'react';
import { Item } from 'semantic-ui-react'

const Kysymys = ({ kysymys }) => {
  if(kysymys){
    return (
      <Item.Group divided>
      <Item>
      <Item.Content>
      <Item.Header>{kysymys.kysymys}</Item.Header>
      <Item.Description>
      {kysymys.selitys}
      </Item.Description>
      <Item.Extra href={kysymys.url}>
      {kysymys.url} </Item.Extra>
      </Item.Content>
      </Item>
      </Item.Group>
    )
  }else {
    return null
  }
  
}
    

  export default Kysymys