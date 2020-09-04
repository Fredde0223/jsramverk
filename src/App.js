import React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Me from './Me.js';
import Week01 from './week01.js';
import './App.css';

const App = () => (
  <Router>
    <div className="App">
      <nav>
        <ul>
          <li>
            <Link to="/">Me</Link>
          </li>
          <li>
            <Link to="/reports/week/1">Week 1</Link>
          </li>
        </ul>
      </nav>
      <Route exact path="/" component={Me} />
      <Route path="/reports/week/1" component={Week01} />
    </div>
  </Router>
);

export default App;
