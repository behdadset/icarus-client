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
      planes: [],
      plane: {}
      // Data for flight
    }
    this.saveSearch = this.saveSearch.bind(this);
    this.selectedPlane = this.selectedPlane.bind(this);
    const fetchFlights = () => {
      axios.get(FLIGHTS_URL).then((results) => {
        this.setState({ flights: results.data })
        // setTimeout(fetchFlights, 6000);
      })
    }
    const fetchPlanes = () => {
      axios.get(PLANES_URL).then((results) => {
        this.setState({ planes: results.data })
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
    axios.post(FLIGHTS_URL, { content: content }).then((result) => {
      this.setState({ flights: [...this.state.flights, result.data] });
    });
  }
  savePlane(content) {
    // create a new secret object with this content
    axios.post(PLANES_URL, { content: content }).then((result) => {
      this.setState({ planes: [...this.state.planes, result.data] });
    });
  }
  saveSearch(from, to, id) {
    this.setState({ origin: from, destination: to })
  }
  selectedPlane(plane) {
    this.setState({ plane: plane })
  }
  render() {
    return (
      <div>
        <h1> Flights Page </h1>
        <Search onSubmit={this.saveSearch} /> // The search bar at the top to find the Flights
        <Table flights={this.state.flights} planes={this.state.planes} origin={this.state.origin} destination={this.state.destination} onClick={this.selectedPlane} /> // Table of flights to choose from.
        <Display plane={this.state.plane} /> // Display of the actual plane.
      </div>
    )
  }
}
class Search extends Component {
  constructor() {
    super();
    this.state = { origin: "", destination: "", plane_id: "" }
    this._handleChangeOrigin = this._handleChangeOrigin.bind(this);
    this._handleChangeDestination = this._handleChangeDestination.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }
  _handleChangeOrigin(event) {
    this.setState({ origin: event.target.value });
  }
  _handleChangeDestination(event) {
    this.setState({ destination: event.target.value });
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
            <option value={this.state.content}>MEL</option>
            <option value={this.state.content}>SYD</option>
            <option value={this.state.content}>PER</option>
            <option value={this.state.content}>BNE</option>
          </select>
          <select type="search" name="destination" size="1" onChange={this._handleChangeDestination} required>
            <option disabled selected value> -- select destination -- </option>
            <option value={this.state.content}>MEL</option>
            <option value={this.state.content}>SYD</option>
            <option value={this.state.content}>PER</option>
            <option value={this.state.content}>BNE</option>
          </select>
          <input type="submit" value="Search" />
        </form>
      </div>
    )
  }
}
const Table = (props) => {
  function expandPlane(plane_id) {
    const found = props.planes.find(p => p.id === plane_id)
    props.onClick(found);
  }
  function formatDate(string) {
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(string).toLocaleDateString([], options);
  }
  return (
    <div id="flightTable">
      {props.flights.filter(s => s.origin === props.origin && s.destination === props.destination).map(flights_filtered => (
        <button onClick={() => { expandPlane(flights_filtered.plane_id) }}>
          {flights_filtered.name} | {formatDate(flights_filtered.departure_date)} => {formatDate(flights_filtered.destination_date)}
        </button>
      ))}
    </div>
  )
}
class Display extends Component {
  constructor() {
    super();
    this.state = {
      totalSeats: [],
      rows: [],
      letters: ['A', 'B', 'C', 'D', 'E', 'F']
    }
    this.toggleClass = this.toggleClass.bind(this)
  }

  generateSeats() {
    let totalSeats = []
    let seats = []
    for (let i = 1; i <= this.props.plane.rows; i++) {
      for (let x = 0; x < this.props.plane.columns; x++) {
        seats = [...seats, {name: `${i}${this.state.letters[x]}`, isTaken: false}]
      }
      totalSeats.push(seats);
      seats = [];
    }
    this.setState({totalSeats: totalSeats})
  }


  toggleClass(rowIndex, seatIndex) {
    const preState = this.state.totalSeats.slice()
    preState[rowIndex][seatIndex] = !preState[rowIndex][seatIndex]
    this.setState({totalSeats: preState})
  }

  componentDidUpdate(prevProps) {
    if (this.props.plane.id !== prevProps.plane.id) {
      this.generateSeats()
    }
  }

    render() {
    return (
      <div id="plane">
        {this.state.totalSeats.map((r, rowIndex) => (
          r.map((s, seatIndex) => <button
          // if statement for the class
          onClick={() => this.toggleClass(rowIndex, seatIndex)}
          className={s.isTaken ? 'taken': ''}
          id={s.name}>{s.name}
          </button>))
        )}
      </div>
    )
  }
}
export default Flights
