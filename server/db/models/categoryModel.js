const Sequelize = require('sequelize');
const db = require('../db');

const Category = db.define('user', {
  Name: {
    type: Sequelize.STRING
  }
}, {
  timestamps: false,
})

Category.hasMany(Post);

Category.sync();

module.exports = Category;