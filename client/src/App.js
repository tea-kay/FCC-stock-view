import React, { Component } from 'react';
import io from 'socket.io-client';
import logo from './logo.svg';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from './actions';
import './App.css';

import {
  Grid,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  FormGroup,
  FormControl,
  PageHeader,
  Button,
  Label
} from 'react-bootstrap';

import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

import SearchBar from './components/SearchBar';
import StockList from './container/StockList';

const socket = io.connect();

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      msg: 'Tim',
      stocks: []
    }

    this.handleInitData = this.handleInitData.bind(this);
  }

  handleInitData({ data, tickers }) {
    this.props.actions.loadInitialData({ data, tickers });
  }

  componentDidMount() {
    socket.on('init', this.handleInitData)
  }

  renderLines() {
    return this.props.symbols.map(symbol => {
      return (
        <Line
          type="monotone"
          dataKey={symbol}
          stroke="#8884d8"
          key={symbol}
        />
      );
    });
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
                <Col md={4} className="logo-sec">STOCKVIEW.IO</Col>
                <Col md={8}>
                  <SearchBar socket={socket} />
                </Col>
              </Row>
              <StockList />
            </Col>
            <Col md={8} className="chart-view">
              <Row>
                <Col md={3}>
                </Col>
                <Col md={6} className="date-range">
                  <Row>
                    <div className="from-to"><h4>From: </h4></div>
                    <FormGroup>
                      <FormControl type="date" name="date" id="exampleDate" placeholder="date placeholder" />
                    </FormGroup>
                    <div className="from-to"><h4>To: </h4></div>
                    <FormGroup>
                      <FormControl type="date" name="date" id="exampleDate" placeholder="date placeholder" />
                    </FormGroup>
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col md={12} className="live-chart">
                  <LineChart width={1200} height={600} data={this.props.data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    {this.renderLines()}
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis dataKey="date" />
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
                <Col md={2} className="view-btns"><Button>5 Year</Button></Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ stocks: { data, symbols } }) => {
  return {
    data,
    symbols
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actionCreators, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
