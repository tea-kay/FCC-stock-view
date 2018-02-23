import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import io from 'socket.io-client';
import logo from './logo.svg';
import './App.css';

import { Grid, Row, Col, ListGroup, ListGroupItem, FormGroup, FormControl, PageHeader, small } from 'react-bootstrap';

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
              <Row>
                <Col md={4} className="logo-sec">LOGO</Col>
                <Col md={8}>
                  <form>
                    <FormGroup bsSize="large" className="row">
                      <FormControl type="text" placeholder="Search By Stock Ticker" className="search-bar fluid"/>
                    </FormGroup>
                  </form>
                </Col>
              </Row>
              <ListGroup className="stock-info">
                <ListGroupItem className="row" >
                  <Row>
                    <Col md={6}><code>APPL</code></Col><Col md={6}><code>$PRICE</code></Col>
                  </Row>
                </ListGroupItem>
                <ListGroupItem className="row">
                  <Row>
                    <Col md={6}><code>APPL</code></Col><Col md={6}><code>$PRICE</code></Col>
                  </Row>
                </ListGroupItem>
                <ListGroupItem className="row">
                  <Row>
                    <Col md={6}><code>APPL</code></Col><Col md={6}><code>$PRICE</code></Col>
                  </Row>
                </ListGroupItem>
              </ListGroup>
            </Col>
            <Col md={8} className="chart-view">
              <Row>
                <Col md={12}>
                <PageHeader className="header-content">
                  Stock View App <small>Visualize The Performance of Your Favorite Stocks</small>
                </PageHeader>
                <br/>
              </Col>
              </Row>
              <Row>
                <Col md={12} className="live-chart">

                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default App;
