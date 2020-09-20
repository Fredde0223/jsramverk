import React from 'react';

class Login extends React.Component {
  state = {
    email: '',
    password: ''
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit = (event) => {
    const that = this;

    fetch('http://localhost:1337/login/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json; charset=utf-8'},
        body: JSON.stringify(this.state)
      }).then(function(response) {
        console.log(response)
        return response.json();
      }).then(function(result) {
        console.log(result);

        if (result.data) {
          localStorage.setItem('email', that.state.email);
          localStorage.setItem('token', result.data.token);
        }
      });
    event.preventDefault();
}

  render() {
    return (
      <div>
        <h1>Logga in</h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Email: <input type="email" value={this.state.value} name="email" onChange={this.handleChange} /></label>
          </div>
          <div>
            <label>Lösenord: <input type="password" value={this.state.value} name="password" onChange={this.handleChange} /></label>
          </div>
          <div>
            <input type="submit" value="Logga in"></input>
          </div>
        </form>
      </div>
    )
  }
};

export default Login;
