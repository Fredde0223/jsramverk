import React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Me from './views/Me';
import Register from './views/Register';
import Login from './views/Login';
import Reports from './views/Reports';
import Edit from './views/Edit';
import Week01 from './views/Week01';
import Week02 from './views/Week02';
import Week03 from './views/Week03';
import Week04 from './views/Week04';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
          <nav>
            <ul>
              <li>
                <Link to="/">Me</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/reports">Create Reports</Link>
              </li>
              <li>
                <Link to="/edit">Edit Reports</Link>
              </li>
              <li>
                <Link to="/reports/week/1">Week 1</Link>
              </li>
              <li>
                <Link to="/reports/week/2">Week 2</Link>
              </li>
              <li>
                <Link to="/reports/week/3">Week 3</Link>
              </li>
              <li>
                <Link to="/reports/week/4">Week 4</Link>
              </li>
            </ul>
          </nav>
          <Route exact path="/" component={Me} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/reports" component={Reports} />
          <Route exact path="/edit" component={Edit} />
          <Route exact path="/reports/week/1" component={Week01} />
          <Route exact path="/reports/week/2" component={Week02} />
          <Route exact path="/reports/week/3" component={Week03} />
          <Route exact path="/reports/week/4" component={Week04} />
        </div>
      </Router>
    )
  }
};

export default App;
