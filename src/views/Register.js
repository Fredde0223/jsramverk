import React from 'react';

class Register extends React.Component {
  state = {
    email: '',
    password: ''
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit = (event) => {
    fetch('https://mitt-api.frah19.me/register/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json; charset=utf-8'},
        body: JSON.stringify(this.state)
      }).then(function(response) {
        console.log(response)
        return response.json();
      });
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <h1>Registrera</h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Email: <input type="email" value={this.state.value} name="email" onChange={this.handleChange} /></label>
          </div>
          <div>
            <label>Lösenord: <input type="password" value={this.state.value} name="password" onChange={this.handleChange} /></label>
          </div>
          <div>
            <input type="submit" value="Registrera"></input>
          </div>
        </form>
      </div>
    )
  }
};

export default Register;
