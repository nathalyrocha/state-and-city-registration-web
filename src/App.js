import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';
import RegisterState from './pages/registerState';
import City from './pages/cities';
import RegisterCity from './pages/registerCity';
import Navbar from './components/navbar';
import States from './pages/states';

function App() {
  return (
    <Router>
      <Navbar />

      <div>
        <Switch>
          <Route exact path="/">
            <States />
          </Route>

          <Route exact path="/state">
            <RegisterState />
          </Route>

          <Route exact path="/city">
            <RegisterCity />
          </Route>

          <Route exact path="/cities">
            <City />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
