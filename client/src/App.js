import React, { Component } from 'react';
import io from 'socket.io-client';
import logo from './logo.svg';
import './App.css';

import { Grid, Row, Col, ListGroup, ListGroupItem, FormGroup, FormControl, PageHeader, Button } from 'react-bootstrap';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

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
    const data = [
      {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
      {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
      {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
      {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
      {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
      {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
      {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
    ];
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
                <ListGroupItem className="row single-stock">
                  <Row>
                    <Col md={6}><code>APPL</code></Col><Col md={6}><code>$PRICE</code></Col>
                  </Row>
                </ListGroupItem>
                <ListGroupItem className="row single-stock">
                  <Row>
                    <Col md={6}><code>APPL</code></Col><Col md={6}><code>$PRICE</code></Col>
                  </Row>
                </ListGroupItem>
                <ListGroupItem className="row single-stock">
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
                  <LineChart width={1200} height={600} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                  </LineChart>
                </Col>
              </Row>
              <Row className="view-btn-section">
                <Col md={2} className="view-btns"><Button>1 Day</Button></Col>
                <Col md={2} className="view-btns"><Button>1 Week</Button></Col>
                <Col md={2} className="view-btns"><Button>1 Month</Button></Col>
                <Col md={2} className="view-btns"><Button>6 Months</Button></Col>
                <Col md={2} className="view-btns"><Button>1 Year</Button></Col>
                <Col md={2} className="view-btns"><Button>All</Button></Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default App;
