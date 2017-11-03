const chatController = require('../controllers/liveChatController.js');

const chatRouter = (io, client) => {
  client.on('addChatMessage', (roomId, messages) => {
    chatController.addChatMessage(io, client, roomId, messages);
  });

  client.on('chatMessage', (roomId, message, username) => {
    io.in(roomId).emit('newMessage', username, message);
  });

  client.on('addUser', (roomId, username) =>{
    io.in(roomId).emit('newUser', username)
  })

  client.on('leftRoom', (roomId, username) => {
    io.in(roomId).emit('removeUser', username);
  })
};

module.exports = chatRouter;
