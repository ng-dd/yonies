const express = require('express');
const parser = require('body-parser');
const path = require('path');
const cors = require('cors');
const http = require('http'); 
require('dotenv').config()

const routes = require('./routes/routes');
const db = require('./db');

const port = process.env.PORT || 4201;
const app = express();

app.use(cors());
app.use(parser.json());
app.use(parser.urlencoded({extended: true}));
app.use('/', routes);

app.use(express.static(path.join(__dirname, 'dist')))
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

const server = http.createServer(app);

server.listen(port, ()=>{
  console.log('listening on port: ' + port);
})