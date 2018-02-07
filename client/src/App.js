import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import io from 'socket.io-client';
import logo from './logo.svg';
import './App.css';

const socket = io.connect();

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      msg: 'Tim'
    }

    this.displayWelcome = this.displayWelcome.bind(this);
  }

  displayWelcome({ msg }) {
    this.setState({ msg })
  }

  increaseCounter() {
    socket.emit('increase')
  }

  componentDidMount() {
    socket.on('welcome', this.displayWelcome)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Button
          onClick={this.increaseCounter}
        >
          Increase
        </Button>
        <h1>{`Hello ${this.state.msg}`}</h1>
      </div>
    );
  }
}

export default App;
