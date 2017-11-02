const liveChatRouter = require('./routes/liveChatRouter.js');
const videoSessionRouter = require('./routes/videoSessionRouter.js');

const socketListen = (io) => {
  io.on('connection', (client) => {
    console.log('connected a user')
    videoSessionRouter(io, client);
    liveChatRouter(io, client);
    // io.on('joinRoom', )
    // io.on('joinRoom', (socket) => {
    //   console.log('joining from on room')
    // })
    // client.emit('joinRoom', );
  })
}
module.exports = socketListen;