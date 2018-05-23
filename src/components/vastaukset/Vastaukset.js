import React from 'react';
import Papa from 'papaparse';
import csv from './vanhatvastaukset.csv'

class Vastaukset extends React.Component {
  constructor(props) {
    super(props);
    this.updateData = this.updateData.bind(this);
    this.state = {
      array: false,
    };
  }

    componentDidMount = async () => {
      // Parse CSV string
      Papa.parse(csv, {
        header: true,
        trimHeader: true,
        download: true,
        complete: this.updateData,
      })
    }

    updateData(result) {
      const data = result.data;
      // Here this is available and we can call this.setState (since it's binded in the constructor)
      this.setState({ array: data }); // or shorter ES syntax: this.setState({ data });
    }

    render() {
      if (this.state.array) {
        const array = Object.keys(this.state.array[1])[16]
        console.log('test', array)
        console.log('array', this.state.array[1])
      }
      return (
        <div>
          <h2>Tervetuloa</h2>
    Täällä voit tarkastella eduskunnan käyttäytymistä suhteessa omiin näkemyksiisi.
        </div>
      )
    }
}

export default Vastaukset
