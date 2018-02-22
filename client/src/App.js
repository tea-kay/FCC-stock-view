import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import io from 'socket.io-client';
import logo from './logo.svg';
import './App.css';

import { Grid, Row, Col, ListGroup, ListGroupItem, FormGroup, FormControl } from 'react-bootstrap';

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
        <div className="container-fluid">
          <Row>
            <Col md={4} className="stock-list">
              <form>
                <FormGroup bsSize="large" className="row">
                  <FormControl type="text" placeholder="Search By Stock Ticker" className="search-bar fluid"/>
                </FormGroup>
              </form>
              <ListGroup className="fluid">
                <ListGroupItem className="row">
                  <Col md={12}><code>APPL</code><code>$PRICE</code></Col>
                </ListGroupItem>
                <ListGroupItem className="row">
                  <Col md={12}><code>APPL</code><code>$PRICE</code></Col>
                </ListGroupItem>
                <ListGroupItem className="row">
                  <Col md={12}><code>APPL</code><code>$PRICE</code></Col>
                </ListGroupItem>
              </ListGroup>
            </Col>
            <Col md={8} className="chart-view">
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default App;
