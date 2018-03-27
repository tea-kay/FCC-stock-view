import {
  ADD_STOCK,
  INITIAL_DATA
} from '../actions';

const INITIAL_STATE = {
  symbols: [],
  data: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INITIAL_DATA:
      return {
        symbols: action.payload.tickers,
        data: action.payload.data
      }
    case ADD_STOCK:
      const symbols = [...state.symbols, action.payload.stock];
      return { data: action.payload.data, symbols };
    default:
      return state;
  };
};
