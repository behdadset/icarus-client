import React, { Component } from 'react'
import axios from 'axios'

const FLIGHTS_URL = 'http://localhost:3000/flights.json';
const PLANES_URL = 'http://localhost:3000/planes.json';


class Flights extends Component {
  constructor() {
      super();
      this.state = {
    // seed data: TODO fetch this via AJAX
        flights: [],
        planes: []
    // Data for flight
      }
      this.saveSearch = this.saveSearch.bind(this);


    const fetchFlights = () => {
      axios.get(FLIGHTS_URL).then((results) => {
        this.setState({flights: results.data})
        setTimeout(fetchFlights, 6000);
      })
    }

    const fetchPlanes = () => {
      axios.get(PLANES_URL).then((results) => {
        this.setState({planes: results.data})
        setTimeout(fetchPlanes, 6000);
      })
    }

    fetchFlights();
    this.saveFlight = this.saveFlight.bind(this)

    fetchPlanes();
    this.savePlanes = this.savePlane.bind(this)

  }

  saveFlight(content) {
    // create a new secret object with this content
    axios.post(FLIGHTS_URL, {content: content}).then((result) => {
      this.setState({flights: [...this.state.flights, result.data]});
    });
  }

  savePlane(content) {
    // create a new secret object with this content
    axios.post(PLANES_URL, {content: content}).then((result) => {
      this.setState({planes: [...this.state.planes, result.data]});
    });
  }

  saveSearch(from, to, id) {
    this.setState({origin: from, destination: to})
  }

  render() {
    return (
      <div>
        <h1> Flights Page </h1>
        <Search onSubmit={this.saveSearch}/> // The search bar at the top to find the Flights
        <Table flights={this.state.flights} origin={this.state.origin} destination={this.state.destination}/> // Table of flights to choose from.
        <Display planes={this.state.planes} id={this.state.plane_id}/> // Display of the actual plane.
      </div>
    )
  }
}

class Search extends Component {
  constructor() {
    super();
    this.state = { origin: "", destination: "", plane_id: "" }

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
    this.props.onSubmit(this.state.origin, this.state.destination, this.state.plane_id);
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
  function formatDate(string){
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(string).toLocaleDateString([],options);
  }

  return (
    <div id="flightTable">
      {props.flights.filter(s => s.origin === props.origin && s.destination === props.destination).map(flights_filtered => (
        <button key={flights_filtered.id} onClick={() => {console.log(flights_filtered.plane_id)}}>
          {flights_filtered.name} | {formatDate(flights_filtered.departure_date)} => {formatDate(flights_filtered.destination_date)}
        </button>
      ))}
    </div>
  )
}

const Display = (props) => {
    let totalSeats = [];
    let rows = [];
    const letters = ['A', 'B', 'C', 'D', 'E', 'F']
    for (let i = 0; i < 10; i++) {
      for (let x = 0; x < 4; x++) {
          rows.push(`${i}${letters[x]}`)
      }
    totalSeats.push(rows)
    rows = [];
    }

    return (

      <div id="plane">
        {totalSeats.map((s) => (
          s.map((r) => <button id={r} key={r} >{r}</button>))
        )
        }
      </div>
    )

}



export default Flights
