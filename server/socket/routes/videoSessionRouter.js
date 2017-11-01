const videoSessionController = require('../controllers/videoSessionController.js');

const videoSessionRouter = (io, client) => {
  client.on('joinRoom', (roomId) => {
    console.log('joining room... ', roomId)
    videoSessionController.joinRoom(io, client, roomId)
  });

  client.on('leaveRoom', roomId => videoSessionController.leaveRoom(io, client, roomId));

  client.on('changeState', (roomId, state, time) => {
    console.log('Emitting changing state to: ', state)
    // console.log('heres io.sockets: ', io.sockets)
    client.broadcast.to(roomId).emit('newState', state, time)
  })
};

module.exports = videoSessionRouter;
