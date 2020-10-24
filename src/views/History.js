import React from 'react';

class History extends React.Component {
  state = {
    history: []
  }

  async componentDidMount() {
    const url = 'http://localhost:3000';
    const response = await fetch(url);
    const result = await response.json();

    for(let i = 0; i < result.length; i++) {
        this.setState({ history: [...this.state.history, result[i].msg] });
    }
  }

  render() {
    return (
        <div>
          <h1>Chat History</h1>
          <div className="chatWindow">
            {this.state.history.map((message, index) => (
              <p className="txtMsg" key={index}>{message}</p>
            ))}
          </div>
        </div>
    );
  }
};

export default History;
