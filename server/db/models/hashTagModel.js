const Sequelize = require('sequelize');
const db = require('../db');

const HashTag = db.define('user', {
  PostId: {
    type: Sequelize.STRING
  },
  Label: {
    type: Sequelize.STRING
  }
}, {
  timestamps: false,
})

HashTag.sync();

module.exports = HashTag;