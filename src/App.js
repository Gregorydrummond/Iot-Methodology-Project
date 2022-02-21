import React, { Component } from 'react'
import './App.css';
import HeartRate from './HeartRate';
import LedState from './LedState';

const virtualLEDPinSelected = 0;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ledOn: false,
      ledValue: null,
    };

    //Bind function
    this.getLedValue = this.getLedValue.bind(this);
    this.turnLedOn = this.turnLedOn.bind(this);
    this.turnLedOff = this.turnLedOff.bind(this);
  }
/*
  componentDidMount() {
    const ledDataURL = `https://blynk.cloud/external/api/get?token=-gBY6blwH_I2tJzJ76skJ-_OCcmmtBIe&v${virtualLEDPinSelected}`;
    fetch(ledDataURL)
      .then(res => res.json())
      .then(res => console.log(res))
      .catch(err => console.log(err)); 
  }
  */

  getLedValue() {
    const url = `https://blynk.cloud/external/api/get?token=-gBY6blwH_I2tJzJ76skJ-_OCcmmtBIe&v${virtualLEDPinSelected}`;
    fetch(url)
      .then(res => res.json())
      .then(res => this.setState({ ledValue: res }))
      .catch(err => console.log(err));
  }

  turnLedOn() {
    const url = `https://blynk.cloud/external/api/update?token=-gBY6blwH_I2tJzJ76skJ-_OCcmmtBIe&v${virtualLEDPinSelected}=1`;
    fetch(url)
      //.then(res => res.json())
      .catch(err => console.log(err));

      this.getLedValue();
  }

  turnLedOff() {
    const url = `https://blynk.cloud/external/api/update?token=-gBY6blwH_I2tJzJ76skJ-_OCcmmtBIe&v${virtualLEDPinSelected}=0`;
    fetch(url)
      //.then(res => res.json())
      .catch(err => console.log(err));

    this.getLedValue();
  }

  render() {
    const { ledValue } = this.state;
    return (
      <div>
        <LedState />
        <button onClick={this.getLedValue}>Get LED Value</button>
        <button onClick={this.turnLedOn}>Turn LED On</button>
        <button onClick={this.turnLedOff}>Turn LED Off</button>
        <HeartRate />
      </div>
    )
  }
}
export default App;
