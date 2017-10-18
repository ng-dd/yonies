'use strict'

module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('post', {
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

// const Post = db.define('user', {
//   Post_Url: {
//     type: Sequelize.STRING
//   },
//   PostLikeCount: {
//     type: Sequelize.INTEGER
//   },
//   Comment: {
//     type: Sequelize.STRING
//   },
//   CommentLikeCount: {
//     type: Sequelize.INTEGER
//   },
//   Parent: {
//     type: Sequelize.STRING
//   }
// }, {
//   timestamps: false,
// })

// Post.hasMany(Hashtag);
// Post.hasMany(Like);
// Post.belongsTo(Category);

// Post.sync();

// module.exports = Post;