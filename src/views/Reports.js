import React from 'react';

class Reports extends React.Component {
  state = {
    email: localStorage.getItem('email'),
    token: localStorage.getItem('token'),
    title: '',
    content: ''
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit = (event) => {
    fetch('https://mitt-api.frah19.me/reports/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'x-access-token': this.state.token
        },
        body: JSON.stringify(this.state)
      }).then(function(response) {
        console.log(response)
        return response.json();
      });
    event.preventDefault();
  }

  render() {
    if (this.state.token) {
      return (
        <div>
          <h1>Lägg till rapport</h1>
          <form onSubmit={this.handleSubmit}>
            <div>
              <label>Titel: <input type="text" value={this.state.value} name="title" onChange={this.handleChange} /></label>
            </div>
            <div>
              <label>Innehåll: <textarea className="inputArea" placeholder="Skriv här..." value={this.state.value} name="content" onChange={this.handleChange} /></label>
            </div>
            <div>
              <input type="submit" value="Lägg till"></input>
            </div>
          </form>
        </div>
      )
    } else {
      return (
        <div>
          <h1>Lägg till rapport</h1>
          <p>Du är inte inloggad. Logga in för att komma åt sidan.</p>
        </div>
      )
    }
  }
};

export default Reports;
