module.exports = (io) => {
  io.sockets.on('connection', (socket) => {
    socket.emit('Welcome', { msg: 'Hello' });
    socket.on('addstock')
  })
}
