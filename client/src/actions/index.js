import axios from 'axios';

export const INITIAL_DATA = 'INITIAL_DATA';

const loadInitialData = () => {
  return { type: INITIAL_DATA }
}

export const ADD_STOCK = 'ADD_STOCK';

const addStock = (stock) => {
  return (dispatch) => {
    dispatch({
      type: ADD_STOCK,
      payload: stock
    });
  };
};

export const actionCreators = {
  loadInitialData,
  addStock
};
