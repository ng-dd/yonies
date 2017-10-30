const liveChatRouter = require('./routes/liveChatRouter.js');
// const videoSessionRouter = require('./routes/videoSessionRouter.js');

const socketListen = (io) => {
  io.on('connection', (client) => {
    liveChatRouter(io, client);
    // videoSessionRouter(io, client);
  })
}
module.exports = socketListen;