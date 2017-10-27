// const Sequelize = require('sequelize');
// const db = require('../db');

// const Category = db.define('user', {
//   Name: {
//     type: Sequelize.STRING
//   }
// }, {
//   timestamps: false,
// })

module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('category', {
    category_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING
    }
  }, {
    timestamps: false
  })
  return Category
}

// Category.hasMany(Post);

// Category.sync();

// module.exports = Category;