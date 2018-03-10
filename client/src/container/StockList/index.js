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
    if (this.props.stocks.length === 0) {
      return <h2>No Stocks</h2>
    }

    return this.props.stocks.map((stock) => {
      return (
        <ListGroupItem className="row single-stock" key={stock}>
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
      </ListGroup>
    )
  }
}

const mapStateToProps = ({ stocks }) => {
  return { stocks: stocks.symbols };
}

const mapDispatchToProps = (dispatch) => {
  return { actions: bindActionCreators(actionCreators, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(StockList);
