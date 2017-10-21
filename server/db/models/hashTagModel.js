// const Sequelize = require('sequelize');
// const db = require('../db');

// const HashTag = db.define('user', {
//   PostId: {
//     type: Sequelize.STRING
//   },
//   Label: {
//     type: Sequelize.STRING
//   }
// }, {
//   timestamps: false,
// })

module.exports = (sequelize, DataTypes) => {
  const HashTag = sequelize.define('hashtag', {
    post_id: {
      type: DataTypes.STRING
    },
    label: {
      type: DataTypes.STRING
    }
  }, {
    timestamps: false
  })
  return HashTag
}

// HashTag.sync();

// module.exports = HashTag;