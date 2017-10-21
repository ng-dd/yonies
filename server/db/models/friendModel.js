// const Sequelize = require('sequelize');
// const db = require('../db');

// const Friend = db.define('user', {
//   UserId: {
//     type: Sequelize.STRING
//   },
//   FriendId: {
//     type: Sequelize.STRING
//   }
// }, {
//   timestamps: false,
// })

module.exports = (sequelize, DataTypes) => {
  const Friend = sequelize.define('friend', {
    user_id: {
      type: DataTypes.STRING
    },
    friend_id: {
      type: DataTypes.STRING
    }
  }, {
    timestamps: false,
  })
  return Friend
}

// Friend.belongsTo(User);

// Friend.sync();

// module.exports = Friend;