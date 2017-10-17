'use strict'

module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('message', {
    video_dm: {
      type: DataTypes.STRING
    },
    message_dm: {
      type: DataTypes.STRING
    },
    user_id: {
      type: DataTypes.STRING
    },
    friend_id: {
      type: DataTypes.STRING
    }
  });
  return Message;
} 

// Message.belongsTo(User);
// Message.belongsTo(Friend);

// Message.sync();

// module.exports = Message;