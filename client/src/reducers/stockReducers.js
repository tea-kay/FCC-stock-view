import { ADD_STOCK } from '../actions';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_STOCK:
      return [...state, action.payload];
    default:
      return state;
  };
};
