const Sequelize = require('sequelize');
const db = require('../db');

const RoomStat = db.define('user', {
  CategoryId: {
    type: Sequelize.STRING
  },
  RoomId: {
    type: Sequelize.STRING
  },
  PersonCount: {
    type: Sequelize.INTEGER
  },
  HostId: {
    type: Sequelize.STRING
  },
  Duration: {
    type: Sequelize.STRING
  }
}, {
  timestamps: false,
})

RoomStat.belongsTo(User);
RoomState.hasMany(Participant);

RoomStat.sync();

module.exports = RoomStat;