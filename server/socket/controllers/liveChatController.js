const Message = require('../../db/models/messageModel');

const addChatMessage = (io, client, roomId, messages) => {
  io.to(roomId).emit('newChatMessage', messages);

  Message.create({
    roomId,
    userId: messages[0].user._id,
    giftedId: messages[0]._id,
    text: messages[0].text,
  })
    .then(message => console.log(`Added new message to db: ${message}`))
    .catch(err => console.log(`FAILED to add message to db: ${err}`));
};

module.exports = {
  addChatMessage,
};
