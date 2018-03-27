import _ from 'lodash';

export const INITIAL_DATA = 'INITIAL_DATA';
const loadInitialData = ({ data: quandl, tickers }) => {

  const data = quandl.reduce((acc, item) => {
    const [ ticker, date, price ] = item;
    const singleDay = {
      date,
      [ ticker ]: price
    };

    const idx = acc.findIndex((obj) => {
      return obj.date === date;
    })

    if (idx === -1) {
      acc.push(singleDay);
    } else {
      acc[idx][ticker] = price;
    }

    return acc;
  }, []);
  return {
    type: INITIAL_DATA,
    payload: {
      data,
      tickers
    }
  }
}

export const ADD_STOCK = 'ADD_STOCK';
const addStock = ({ data, stock }) => {
  return (dispatch, getState) => {

    const existingData = _.cloneDeep(getState().stocks.data);

    const updatedData = data.reduce((acc, item) => {
      const [ ticker, date, price ] = item;
      const singleDay = {
        date,
        [ ticker ]: price
      };

      const idx = acc.findIndex((obj) => {
        return obj.date === date;
      })

      if (idx === -1) {
        acc.push(singleDay);
      } else {
        acc[idx][ticker] = price;
      }

      return acc;
    }, existingData);

    dispatch({
      type: ADD_STOCK,
      payload: { data: updatedData, stock }
    });
  };
};

export const actionCreators = {
  loadInitialData,
  addStock
};
