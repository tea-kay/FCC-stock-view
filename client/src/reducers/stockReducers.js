import { ADD_STOCK } from '../actions';

const INITIAL_STATE = {
  symbols: [],
  data: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_STOCK:
      const symbols = [...state.symbols, action.payload];
      return { ...state, symbols }
    default:
      return state;
  };
};
