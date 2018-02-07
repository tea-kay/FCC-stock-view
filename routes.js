let counter = 0;

module.exports = (io) => {
  io.sockets.on('connection', (socket) => {
    socket.emit('welcome', { msg: counter });

    socket.on('increase', () => {
      counter++;
      io.emit('welcome', { msg: counter });
    })
  })
}
