const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define our model
const symbolSchema = new Schema({
  symbol: String,
}, { timestamps: true });

const ModelClass = mongoose.model('symbol', symbolSchema);
module.exports = ModelClass;
