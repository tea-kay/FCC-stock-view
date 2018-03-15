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

  handleInput(e) {
    this.setState({
      searchTerm: e.target.value
    })
  }

  handleAdd(e) {
    if (e.keyCode === 13) {
      socket.emit('addStock', { stock: this.state.searchTerm })
      this.props.actions.addStock(this.state.searchTerm);
      this.setState({
        searchTerm: ''
      })
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
