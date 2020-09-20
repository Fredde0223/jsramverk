import React from 'react';

class Edit extends React.Component {
  state = {
    email: localStorage.getItem('email'),
    token: localStorage.getItem('token'),
    title: '',
    content: '',
    selected: '',
    array: []
  }

  handleChangeSelect = async (event) => {
     await this.setState({selected: event.target.value});

    for (var i = 0; i < this.state.array.length; i++) {
      if (this.state.selected === this.state.array[i].title) {
        this.setState({title: this.state.array[i].title});
        this.setState({content: this.state.array[i].content});
      }
    };
  }

  handleChangeSubmit = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit = (event) => {
    fetch('http://localhost:1337/reports/edit/', {
        method: 'PUT',
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

  async componentDidMount() {
    const url = 'http://localhost:1337/reports/edit/';
    const response = await fetch(url);
    const result = await response.json();
    this.setState({ array: result.data });
  }

  render() {
    if (this.state.token) {
      return (
        <div>
          <h1>Ändra i rapport</h1>
          <form onSubmit={this.handleSubmit}>
            <div>
              <label>Välj rapport: </label>
              <select name="dropdown" id="dropdown" onChange={this.handleChangeSelect}>
                <option>Välj här... </option>
                {
                  this.state.array.map(function( {title} ) {
                    return <option key={title}>{title}</option>
                  })
                }
              </select>
            </div>
            <div>
              <label>Titel: </label>
              <input type="text" value={this.state.title} name="title" onChange={this.handleChangeSubmit} />
            </div>
            <div>
              <label>Innehåll: </label>
              <textarea className="inputArea" placeholder="Skriv här..." value={this.state.content} name="content" onChange={this.handleChangeSubmit} />
            </div>
            <div>
              <input type="submit" value="Utför"></input>
            </div>
          </form>
        </div>
      )
    } else {
      return (
        <div>
          <h1>Ändra i rapport</h1>
          <p>Du är inte inloggad. Logga in för att komma åt sidan.</p>
        </div>
      )
    }
  }
};

export default Edit;
