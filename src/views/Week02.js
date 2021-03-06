import React from 'react';

class Week02 extends React.Component {
  state = {
    title: null,
    content: null
  };

  async componentDidMount() {
    const url = "https://mitt-api.frah19.me/reports/week/2";
    const response = await fetch(url);
    const result = await response.json();
    this.setState({ title: result.data.title, content: result.data.content });
  }

  render () {
    return (
      <div>
        <h1>{this.state.title}</h1>
        <p>
          <a href="https://github.com/Fredde0223/jsramverk">Min app på Github</a>
        </p>
        <p>
          <a href="https://github.com/Fredde0223/jsramv_api">Mitt API på Github</a>
        </p>
        &nbsp;
        <textarea className="outputArea" readonly value={this.state.content}></textarea>
      </div>
    );
  }
};

export default Week02;
