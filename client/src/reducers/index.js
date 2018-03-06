import { combineReducers } from 'redux';
import stocks from './stockReducers';

const rootReducer = combineReducers({
  stocks
});

export default rootReducer;
