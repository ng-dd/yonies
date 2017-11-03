const chatController = require('../controllers/liveChatController.js');

const chatRouter = (io, client) => {
  client.on('addChatMessage', (roomId, messages) => {
    chatController.addChatMessage(io, client, roomId, messages);
  });

  client.on('chatMessage', (roomId, message, username) => {
    io.in(roomId).emit('newMessage', username, message);
  });
};

module.exports = chatRouter;
