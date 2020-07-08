import React, { Component } from 'react'
import axios from 'axios'


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
  render() {
    return (
      <h2>Search Bar</h2>
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
