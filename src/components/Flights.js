import React, { Component } from 'react'
import axios from 'axios'

const SERVER_URL = 'http://localhost:3000/flights.json';


class Flights extends Component {

  render() {
    return (
      <div>
        <h1> Flights Page </h1>
        <Search /> // The search bar at the top to find the Flights
        <Table /> // Table of flights to choose from.
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
    this.props.onSubmit(this.state.origin);
    this.setState({origin: ''});

    this.props.onSubmit(this.state.destination);
    this.setState({destination: ''});
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
            <option value="MEL">MEL</option>
            <option value="SYD">SYD</option>
            <option value="PER">PER</option>
            <option value="BNE">BNE</option>
          </ select>

          <input type="submit" value="Search" />
        </form>
      </div>
    )
  }
}




class Table extends Component {
  render() {
    return (
      <h2>Table</h2>
    )
  }
}

class Display extends Component {
  render() {
    return (
      <h2>Plane Display</h2>
    )
  }
}






export default Flights
