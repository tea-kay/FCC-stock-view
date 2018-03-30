import React, { Component } from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actionCreators } from '../../actions';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: ''
    }

    this.handleInput = this.handleInput.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  componentDidMount() {
    this.props.socket.on('addStockClient', ({ data, stock }) => {
      this.props.actions.addStock({ data, stock });
    });
  }

  handleInput(e) {
    this.setState({
      searchTerm: e.target.value.toUpperCase()
    })
  }

  isValidSymbol(symbol) {
    const regex = /^[A-Z]{2,4}$/;
    return regex.test(symbol);
  }

  handleAdd(e) {
    if (e.keyCode === 13) {
      if (this.isValidSymbol(this.state.searchTerm)) {
        if (this.props.stocks.includes(this.state.searchTerm)) {
          alert('This symbol has been added')
          return;
        }
        this.props.socket.emit('addStock', { stock: this.state.searchTerm })
        this.setState({ searchTerm: '' })
      } else {
        alert('Symbols are 2-4 alphabetic characters');
      }
    }
  }

  render () {

    return(

      <FormGroup bsSize="large" className="row">
        <FormControl
          type="text"
          placeholder="Search By Stock Ticker"
          className="search-bar fluid"
          value={this.state.searchTerm}
          onChange={this.handleInput}
          onKeyUp={this.handleAdd}
        />
      </FormGroup>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    stocks: state.stocks.symbols
  };
};

const mapDispatchToProps = (dispatch) => {
  return { actions: bindActionCreators(actionCreators, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
