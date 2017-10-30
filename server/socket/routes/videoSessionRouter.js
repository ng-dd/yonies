const videoSessionController = require('../controllers/videoSessionController.js');

const videoSessionRouter = (io, client) => {
  client.on('joinRoom', houseId => videoSessionController.joinRoom(io, client, roomId));

  client.on('leaveRoom', houseId => videoSessionController.leaveRoom(io, client, roomId));
};

module.exports = videoSessionRouter;
