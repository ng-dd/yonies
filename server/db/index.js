var Sequelize = require('sequelize');
require('dotenv').config();
// dotenv.load();
// import { Like } from '../db/models/likeModel';
// import { User } from '../db/models/userModel';

console.log(process.env.DATABASE_URL, 'EEEEEEEEEEEEEEEEEEEEE')
const sequelize = new Sequelize('OrbitDB', 'ngdd', 'plantlife', {
  host: process.env.DATABASE_URL,
  port: 5432,
  dialect: 'postgres',
  dialectOptions: {
    ssl:'Amazon RDS'
  }});
  
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

  
  //Associations
  
  db.User.hasMany(db.Like, {foreignKey: User_id});
  db.User.hasMany(db.Message);
  db.User.hasMany(db.RoomStat);
  db.User.hasMany(db.Friend);

  //likes
  db.Like.belongsTo(db.User);
  db.Like.belongsTo(db.Post);

  //messages
  db.Message.belongsTo(db.User);
  db.Message.belongsTo(db.Friend);

  //room stats
  db.RoomStat.belongsTo(db.User);
  db.RoomStat.hasMany(db.Participant);

  //Friends
  db.Friend.belongsTo(db.User);

  //Posts
 db.Post.hasMany(db.HashTag);
 db.Post.hasMany(db.Like);
 db.Post.belongsTo(db.Category);

  //Participants
 db.Participant.belongsTo(db.RoomStat);

  //categories
 db.Category.hasMany(db.Post);

  // hash tags
 db.HashTag.belongsTo(db.Post);


//SYNC???
// for(var key in db) {
// var dbkeys = Object.keys(db)
// for (var i = 2; i < dbkeys.length; i++) {
//   console.log(dbkeys[i])
//   dbkeys[i].sync()
// }
for (var key in db) {
  (db[key]).sync()
}
  // console.log(dbkeys)
  // db[key].sync()
// }
// db.sync();

// db.authenticate()



module.exports = db;
