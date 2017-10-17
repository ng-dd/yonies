const Sequelize = require('sequelize');
const db = require('../db');

const Friend = db.define('user', {
  UserId: {
    type: Sequelize.STRING
  },
  FriendId: {
    type: Sequelize.STRING
  }
}, {
  timestamps: false,
})

Friend.belongsTo(User);

Friend.sync();

module.exports = Friend;