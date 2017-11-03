const videoSessionController = require('../controllers/videoSessionController.js');

const videoSessionRouter = (io, client) => {
  client.on('joinRoom', (roomId) => {
    console.log('joining room... ', roomId)
    videoSessionController.joinRoom(io, client, roomId)
  });

  client.on('leaveRoom', roomId => videoSessionController.leaveRoom(io, client, roomId));

  client.on('changeState', (roomId, state, time, username) => {
    console.log('Emitting changing state to: ', state)
    client.broadcast.to(roomId).emit('newState', state, time, username)
  });

  client.on('pauseRequest', (roomId, username) => {
    io.in(roomId).emit('pauseResponse', username);
  });

  client.on('playRequest', (roomId, username) => {
    io.in(roomId).emit('playResponse', username);
  });

  client.on('skipToRequest', (roomId, username, time) => {
    io.in(roomId).emit('skipToResponse', username, time);
  });

};

module.exports = videoSessionRouter;
