'use strict'

module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define('like', {
    uid: {
      type: DataTypes.STRING
    },
    post_id: {
      type: DataTypes.INTEGER
    },
    tag: {
      type: DataTypes.STRING
    }
  }, {
    timestamps: false,
  });
  return Like;
};  
