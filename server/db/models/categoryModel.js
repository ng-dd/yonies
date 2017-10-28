

module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('category', {
    category_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING
    },
    uid: {
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