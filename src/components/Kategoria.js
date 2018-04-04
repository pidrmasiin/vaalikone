import React from 'react';
import { Item } from 'semantic-ui-react'
import Kysymys from './Kysymys'

const Kategoria = ({ kategoria, kysymykset }) => {
    
  if(kategoria){
    return (
      <div className="container"> 
      <Item.Group>
      <Item>
      <Item.Content>
      <Item.Header><h1>{kategoria.nimi}</h1></Item.Header>
      </Item.Content>
      </Item>
      {kategoria.kysymykset.map(k => 
        <Item.Group key={k} divided unstackable>
        <Kysymys kysymys={kysymykset.find(x => x.id === k)}/>
        </Item.Group>)}
      </Item.Group>
      </div>
    )
  }else {
    return null
  }
  
}

    

  export default Kategoria