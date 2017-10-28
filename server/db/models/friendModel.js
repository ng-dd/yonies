
module.exports = (sequelize, DataTypes) => {
  const Friend = sequelize.define('friend', {
    user_id: {
      type: DataTypes.INTEGER
    },
    friend_id: {
      type: DataTypes.INTEGER
    }
  }, {
    timestamps: false,
  })
  return Friend
}
