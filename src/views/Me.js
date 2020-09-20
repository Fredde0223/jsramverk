import React from 'react';

class Me extends React.Component {
  state = {
    title: null,
    about: null
  }

  async componentDidMount() {
    const url = 'http://localhost:1337/';
    const response = await fetch(url);
    const result = await response.json();
    this.setState({ title: result.data.title, about: result.data.about });
    localStorage.clear();
  }

  render() {
    return (
      <div>
        <h1>{this.state.title}</h1>
        <p>{this.state.about}</p>
      </div>
    );
  }
};

export default Me;
