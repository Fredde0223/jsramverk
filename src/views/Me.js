import React from 'react';

class Me extends React.Component {
  state = {
    title: null,
    about: null
  }

  async componentDidMount() {
    const url = 'https://mitt-api.frah19.me/';
    const response = await fetch(url);
    const result = await response.json();
    this.setState({ title: result.data.title, about: result.data.about });
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
