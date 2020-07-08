import React, { Component } from 'react'
import axios from 'axios'

const SERVER_URL = 'http://localhost:3000/flights.json';


class Flights extends Component {
  constructor() {
      super();
      this.state = {
    // seed data: TODO fetch this via AJAX
        flights: [],

    // Data for flight
      }
      this.saveSearch = this.saveSearch.bind(this);


    const fetchFlights = () => {

      axios.get(SERVER_URL).then((results) => {
        this.setState({flights: results.data})
        setTimeout(fetchFlights, 6000);
      })
    }

    fetchFlights();
    this.saveFlight = this.saveFlight.bind(this)
    

  }

  saveFlight(content) {
    // create a new secret object with this content
    axios.post(SERVER_URL, {content: content}).then((result) => {
      this.setState({flights: [...this.state.flights, result.data]});
    });
  }

  saveSearch(from, to) {
    this.setState({origin: from, destination: to})
  }



  render() {
    return (
      <div>
        <h1> Flights Page </h1>
        <Search onSubmit={this.saveSearch}/> // The search bar at the top to find the Flights
        <Table flights={this.state.flights} origin={this.state.origin} destination={this.state.destination}/> // Table of flights to choose from.
        <Display /> // Display of the actual plane.
      </div>
    )
  }
}

class Search extends Component {
  constructor() {
    super();
    this.state = { origin: "", destination: "" }

    this._handleChangeOrigin= this._handleChangeOrigin.bind(this);
    this._handleChangeDestination= this._handleChangeDestination.bind(this);

    this._handleSubmit= this._handleSubmit.bind(this);
  }


  _handleChangeOrigin(event) {
    this.setState({origin: event.target.value});
  }

  _handleChangeDestination(event) {
    this.setState({destination: event.target.value});
  }

  _handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state.origin, this.state.destination);
  }

  render() {
    return (
      <div>
        <h2>Search Bar</h2>
        <form onSubmit={this._handleSubmit}>
          <select type="search" name="origin" size="1" onChange={this._handleChangeOrigin} required >
            <option disabled selected value> -- select origin -- </option>
            <option value={ this.state.content }>MEL</option>
            <option value={ this.state.content }>SYD</option>
            <option value={ this.state.content }>PER</option>
            <option value={ this.state.content }>BNE</option>
          </ select>

          <select type="search" name="destination" size="1" onChange={this._handleChangeDestination} required>
            <option disabled selected value> -- select destination -- </option>
            <option value={ this.state.content }>MEL</option>
            <option value={ this.state.content }>SYD</option>
            <option value={ this.state.content }>PER</option>
            <option value={ this.state.content }>BNE</option>
          </ select>

          <input type="submit" value="Search" />
        </form>
      </div>
    )
  }
}


const Table = (props) => {

    return (
      <ol id="flightTable">
        {props.flights.filter(s => s.origin === props.origin && s.destination === props.destination).map(flights_filtered => (
          <li>
            {flights_filtered.name}
          </li>
        ))}
      </ol>
    )
}

class Display extends Component {

  
  render() {
    for(let i =0; i<10; i++ ){
      return (
      <h2>Plane Display{i+1}</h2>
      )
    }
    
  }
}






export default Flights
