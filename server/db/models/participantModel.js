const Sequelize = require('sequelize');
const db = require('../db');

const Participant = db.define('user', {
  UserId: {
    type: Sequelize.STRING
  }
}, {
  timestamps: false,
})

Participant.belongsTo(RoomStat);

Participant.sync();

module.exports = Participant;