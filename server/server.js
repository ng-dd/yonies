const express = require('express');
const parser = require('body-parser');
const path = require('path');
const cors = require('cors');
const http = require('http'); 
const socketIO = require('socket.io');

require('dotenv').config()

const routes = require('./routes/routes');
const db = require('./db');

const port = process.env.PORT || 4201;
const app = express();

app.use(cors());
app.use(parser.json());
app.use(parser.urlencoded({extended: true}));
app.use('/', routes);
app.use(function(req, res, next){
  res.header("Cache-Control", "no-cache, no-store, must-revalidate");
  res.header("Pragma", "no-cache");
  res.header("Expires", 0);
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "Options") {
      res.send(200);
  } else {
      return next();
  }
})

// Socket Chat Functionality - define variables
const users = [];
let username = '';
let userid = '';
let hostUserName = '';
let hostUserid = '';

// Connect via Socket IO session
io.on('connection', function(socket) {
  // Listen for requests from users in room
  socket.on('getUserSocketid', () => {
    io.emit('userSocketid', userid);
  });

  socket.on('', () => {
    io.emit('', this.);
  });

  // Listen for request for host id
  socket.on('', () => {
    io.emit('', this.);
  });

  // Listen for user to request chat
  socket.on('', () => {
    io.emit('', this.);
  });

  // Listen for host to approve chat
  socket.on('', () => {
    io.emit('', this.);
  });

  // Listen for new chat messages // sending to all clients, include sender
  socket.on('', () => {
    io.emit('message', this.);
  });
  // sending to all clients in 'game' room(channel), include sender
  io.in('game').emit('message', 'cool game');


  // End Chat
  socket.on('', () => {
    io.emit('', this.);
  });

  // Disconnect
  socket.on('', () => {
    io.emit('', this.);
  });
  

// sending to all clients in namespace 'myNamespace', include sender
io.of('myNamespace').emit('message', 'gg');

// sending to individual socketid (server-side)
socket.broadcast.to(socketid).emit('message', 'for your eyes only');

// join to subscribe the socket to a given channel (server-side):
socket.join('some room');

// then simply use to or in (they are the same) when broadcasting or emitting (server-side)
io.to('some room').emit('some event'):

// leave to unsubscribe the socket to a given channel (server-side)
socket.leave('some room');
})

app.use(express.static(path.join(__dirname, '../dist')))
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

const server = http.createServer(app);

server.listen(port, (err)=>{
  if (err) {
    return console.log(err)
  }
  console.log('listening on port: ' + port);

})