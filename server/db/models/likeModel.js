'use strict'

module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define('like', {
    user_id: {
      type: DataTypes.STRING
    },
    post_id: {
      type: DataTypes.STRING
    }
  }, {
    timestamps: false,
  });
  return Like;
};  

// Like.belongsTo(User);
// Like.belongsTo(Post);

// Like.sync();

// module.exports = Like;