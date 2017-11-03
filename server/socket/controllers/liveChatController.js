const addChatMessage = (io, client, roomId, messages) => {
  client.broadcast.to(roomId).emit('newChatMessage', messages);

  Message.create({
    roomId,
    userId: messages[0].user._id,
    text: messages[0].text,
  })
    .then(message => console.log(`Added new message to chat room: ${message}`))
    .catch(err => console.log(`FAILED to add message to chat room: ${err}`));
};

module.exports = {
  addChatMessage,
};
