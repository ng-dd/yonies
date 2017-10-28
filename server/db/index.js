var Sequelize = require('sequelize');
require('dotenv').config();
// dotenv.load();
// import { Like } from '../db/models/likeModel';
// import { User } from '../db/models/userModel';

console.log(process.env.DATABASE_URL, 'EEEEEEEEEEEEEEEEEEEEE')
const sequelize = new Sequelize('yoniesDB', 'ngdd', 'plantlife', {
  host: process.env.DATABASE_URL,
  port: 5432,
  dialect: 'postgres',
  dialectOptions: {
    ssl:'Amazon RDS'
  },
  pool: {
    max: 5,
    min: 0,
    idle: 20000,
    acquire: 20000
  }});
  
  // const sequelize = new Sequelize('postgres://gqhmxfxh:0moqyFAzfF1UOx3Nw8kKuly4cdpyH3f5@pellefant.db.elephantsql.com:5432/gqhmxfxh', {dialect: 'postgres'})
  sequelize.authenticate()
    .then(console.log('connected to the database!'))
    .catch(err => console.log('error connecting to database!', err));

  let db ={}
  
  // db.Sequelize = Sequelize;
  // db.sequelize = sequelize;
  
  //Models
  db.User = require('../db/models/userModel')(sequelize, Sequelize);
  db.Like = require('../db/models/likeModel')(sequelize, Sequelize);
  db.Message = require('../db/models/messageModel')(sequelize, Sequelize);
  db.Category = require('../db/models/categoryModel')(sequelize, Sequelize);
  db.Friend = require('../db/models/friendModel')(sequelize, Sequelize);
  db.HashTag = require('../db/models/hashTagModel')(sequelize, Sequelize);
  db.Participant = require('../db/models/participantModel')(sequelize, Sequelize);
  db.Post = require('../db/models/postModel')(sequelize, Sequelize);
  db.RoomStat = require('../db/models/roomStatModel')(sequelize, Sequelize);

  
  // //Associations
  
  // db.User.hasMany(db.Like, {foreignKey: 'user_id'});
  // db.User.hasMany(db.Message, {foreignKey: 'user_id'});
  // // db.User.hasMany(db.RoomStat, {foreignKey: 'user_id'});
  // db.User.hasMany(db.Friend, {foreignKey: 'user_id'});

  // //likes
  // db.Like.belongsTo(db.User, {foreignKey: 'user_id'});
  // db.Like.belongsTo(db.Post, {foreignKey: 'post_id'});

  // //messages
  // db.Message.belongsTo(db.User, {foreignKey: 'user_id'});
  // db.Message.belongsTo(db.Friend, {foreignKey: 'friend_id'});

  //room stats
  // db.RoomStat.belongsTo(db.User, {foreignKey: 'user_id'});
  // db.RoomStat.hasMany(db.Participant, {foreignKey: 'room_id'});

  //Friends
  // db.Friend.hasMany(db.Message, {foreignKey: 'friend_id'});
  // db.Friend.belongsTo(db.User, {foreignKey: 'user_id'});

  // //Posts
  // db.Post.hasMany(db.HashTag, {foreignKey: 'post_id'});
  // db.Post.hasMany(db.Like, {foreignKey: 'post_id'});
  // db.Post.belongsTo(db.Category, {foreignKey: 'catgory_id'});

  // //Participants
  // db.Participant.belongsTo(db.RoomStat, {foreignKey: 'room_id'});

  // //categories
  // db.Category.hasMany(db.Post, {foreignKey: 'catgory_id'});

  // // hash tags
  // db.HashTag.belongsTo(db.Post, {foreignKey: 'post_id'});


//SYNC

for (var key in db) {
  console.log('@@@@@@@@@@@@SYNCING@@@@@@@@@@@: ', key)
  db[key].sync({force: true})
}

module.exports = db;
