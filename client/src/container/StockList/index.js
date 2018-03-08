import React, { Component } from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Grid, Row, Col, ListGroup, ListGroupItem, PageHeader, Button, Label } from 'react-bootstrap';

import { actionCreators } from '../../actions';

class StockList extends Component {
  constructor(props) {

    super(props);
  }

  renderStockList() {
    return this.state.stocks.map(({ stock }) => {
      return (
        <ListGroupItem className="row single-stock">
          <Row>
            <Col md={6}><code>{stock}</code></Col><Col md={6}><code>$PRICE</code></Col>
          </Row>
        </ListGroupItem>
      )
    });
  }

  render() {
    return (
      <ListGroup className="stock-info">
        {this.renderStockList()}
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
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return { actions: bindActionCreators(actionCreators, dispatch) }
}

export default connect(null, mapDispatchToProps)(StockList);
