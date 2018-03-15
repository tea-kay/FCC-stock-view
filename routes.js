const Symbol = require('./models/Symbol');
const moment = require('moment');
const fetch = require('isomorphic-fetch');

module.exports = (io) => {
  io.sockets.on('connection', (socket) => {

    // Initial Load
    Symbol.find({}).lean().exec((err, symbols) => {
      if (err) {
        socket.emit('errorMessage', { msg: 'Error reading from database' })
      } else if (!symbols.length) {
        socket.emit('errorMessage', { msg: 'There are no symbols in the database' })
      } else {
        const tickers = symbols.map(({ symbol }) => symbol)
        const lte = moment().format('YYYYMMDD')
        const gte = moment().subtract(1, 'months').format('YYYYMMDD')
        const quandl = `https://www.quandl.com/api/v3/datatables/WIKI/PRICES.json?qopts.columns=ticker,date,close&date.gte=${gte}&date.lte=${lte}&ticker=${tickers.join(',')}&api_key=${process.env.QUANDL_API}`

        fetch(quandl).then(response => response.json()).then(({ datatable }) => {
          const { data } = datatable
          socket.emit('init', { data, tickers })
        })
      }
    })

    // Adding stocks
    socket.on('addStock', ({ stock }) => {
      const lte = moment().format('YYYYMMDD')
      const gte = moment().subtract(5, 'years').format('YYYYMMDD')

      const newStock = new Symbol({
        symbol: stock
      });

      newStock.save(err => {
        if (err) {
          socket.emit('errorMessage', { msg: 'Error adding new stock to database' })
          return;
        }
        const quandl = `https://www.quandl.com/api/v3/datatables/WIKI/PRICES.json
          ?qopts.columns=ticker,date,close
          &date.gte=${gte}
          &date.lte=${lte}
          &ticker=${stock}&api_key=${process.env.QUANDL_API}`

          fetch(quandl).then(response => response.json()).then(({ datatable }) => {
            const { data } = datatable
            io.emit('addStockClient', { data, stock })
          })
      });
    });
  })
}

// arr.myMap(function(item, idx) {
//   return item.toUpperCase()
// })
//
// Array.prototype.myMap = function(cb) {
//   var result = [];
//   for (var i = 0; i < this.length; i++) {
//     result.push(cb(this[i]))
//   }
//   return result;
// }
