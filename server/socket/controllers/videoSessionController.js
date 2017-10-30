const joinRoom = (io, client, roomId) => {
    client.join(roomId);
    
};
  
const leaveRoom = (io, client, roomId) => {
    client.leave(roomId);
};
  
module.exports = {
    joinRoom,
    leaveRoom,
};
  