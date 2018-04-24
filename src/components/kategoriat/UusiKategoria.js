import React from 'react';
import { Form, Button } from 'semantic-ui-react'
import kategoriaService from './../../services/kategoria'

class UusiKategoria extends React.Component {

    onSubmit =  async (e) => {
        e.preventDefault()
            const kategoria = {
                nimi: e.target.kategoria.value,
            }
        e.target.kategoria.value = ''
      try {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        kategoriaService.setToken(JSON.parse(loggedUserJSON).token)
        await kategoriaService.addKategoria(kategoria)
        this.props.history.push('/')
      } catch (exception){
        console.log('Tapahtui virhe')
      }
    }

    render(){
        return(
            <Form onSubmit={this.onSubmit}>
                 <Form.Input label="Lisättävä kategoria" placeholder="Kategoria"
                 name="kategoria"
                 />
                <Button inverted color='green' type="submit">Tallenna</Button>
                
        </Form>
    
        )
    }
}

export default UusiKategoria