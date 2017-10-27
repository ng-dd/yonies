'use strict'

//user has likes 
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('post', {
    post_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    post_url: {
      type: DataTypes.STRING
    },
    post_like_count: {
      type: DataTypes.INTEGER
    },
    comment: {
      type: DataTypes.STRING
    },
    comment_like_count: {
      type: DataTypes.INTEGER
    },
    parent: {
      type: DataTypes.STRING
    }
  }, {
    timestamps: false,
  })
  return Post;
}
