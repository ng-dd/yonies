// const Sequelize = require('sequelize');
// const db = require('../db');

// const Participant = db.define('user', {
//   UserId: {
//     type: Sequelize.STRING
//   }
// }, {
//   timestamps: false,
// })
'use strict'

module.exports = (sequelize, DataTypes) => {
  const Participant = sequelize.define('participant', {
    user_id: {
      type: DataTypes.STRING
    }
  }, {
    timestamps: false,
  })
}

// Participant.belongsTo(RoomStat);

// Participant.sync();

// module.exports = Participant;