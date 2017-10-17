const Sequelize = require('sequelize');
const db = require('../db');

const Post = db.define('user', {
  Post_Url: {
    type: Sequelize.STRING
  },
  PostLikeCount: {
    type: Sequelize.INTEGER
  },
  Comment: {
    type: Sequelize.STRING
  },
  CommentLikeCount: {
    type: Sequelize.INTEGER
  },
  Parent: {
    type: Sequelize.STRING
  }
}, {
  timestamps: false,
})

Post.hasMany(Hashtag);
Post.hasMany(Like);
Post.belongsTo(Category);

Post.sync();

module.exports = Post;