import React from 'react';
import Home from './Home'
import Nav from './Nav'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Signup from './Signup';

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route path="/" exact component ={Home} />

          <Route path="/signup" component ={Signup} />
        </Switch>
      </div>
      
    </Router>
  );
}

export default App;
