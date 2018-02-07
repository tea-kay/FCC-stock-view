const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const http = require('http');
const logger = require('morgan');
const app = express();

// DB Setup
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/stock-view');

const server = http.createServer(app);
const io = require('socket.io').listen(server);

require('./routes')(io);

app.use(express.static(path.join(__dirname, 'client', 'build')));
app.use(logger('combined'));
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/index.html')
});

const port = process.env.PORT || 3001;
server.listen(port, () => {
  console.log('Express server is starting up');
})
