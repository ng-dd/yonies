const express = require('express');
const parser = require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express();

const http = require('http')
require('dotenv').config()

const server = http.createServer(app);

// Socket
const io = require('socket.io')(server);
const startSocket = require('./socket');
startSocket(io);

// Routes
const routes = require('./routes/routes');

// DB
const db = require('./db');

const port = process.env.PORT || 4201;
// const app = express();
// app.use(express.static(__dirname + '/src/'))
app.use(cors());
app.use(parser.json());
app.use(parser.urlencoded({extended: true}));
// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/src/index.html')
// })
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

app.use(express.static(path.join(__dirname, '../dist')))
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});



io.on('connection', (socket) => {
  console.log('a user connected')
  socket.emit('signal', {
    greeting: 'we get signal'
  })
})

server.listen(port, (err)=>{
  if (err) {
    return console.log(err)
  }
  console.log('listening on port: ' + port);

})