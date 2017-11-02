const chatController = require('../controllers/liveChatController.js');

const chatRouter = (io, client) => {
  client.on('addChatMessage', (roomId, messages) => {
    chatController.addChatMessage(io, client, roomId, messages);
  });
};

module.exports = chatRouter;
