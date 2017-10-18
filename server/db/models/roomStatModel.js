'use strict'

module.exports = (sequelize, DataTypes) => {
  const RoomStat = sequelize.define('roomstat', {
    category_id: {
      type: DataTypes.STRING
    },
    room_id: {
      type: DataTypes.STRING
    },
    person_count: {
      type: DataTypes.INTEGER
    },
    host_id: {
      type: DataTypes.STRING
    },
    duration: {
      type: DataTypes.STRING
    }
  });
  return RoomStat;
} 


// RoomStat.belongsTo(User);
// RoomState.hasMany(Participant);

// RoomStat.sync();

// module.exports = RoomStat;