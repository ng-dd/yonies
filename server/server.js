const express = require('express');
const parser = require('body-parser');
const path = require('path');
require('dotenv').config()

const routes = require('../routes/routes');
const db = require('../db');

const port = process.env.PORT || 4201;
const app = express();

app.use(parser.json());
app.use(parser.urlencoded({extended: true}));

app.use('/api', routes);

app.listen(port, ()=>{
  console.log('listening on port: ' + port);
})