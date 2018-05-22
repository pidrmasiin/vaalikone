import React from 'react';

const csv = require('csv-parser')
const fs = require('fs')

class Vastaukset extends React.Component {
    componentDidMount = () => {
      fs.createReadStream('/vanhatvastaukset.csv')
        .pipe(csv())
        .on('data', (data) => {
          console.log('data', data)
        })
    }
    render() {
      return (
        <div>
          <h2>Tervetuloa</h2>
    Täällä voit tarkastella eduskunnan käyttäytymistä suhteessa omiin näkemyksiisi.
        </div>
      )
    }
}

export default Vastaukset
