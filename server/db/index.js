var Sequelize = require('sequelize');
require('dotenv').config();
// var dbUrl = require('../../dburl');

const sequelize = new Sequelize('yoniesDB', 'ngdd', 'plantlife', {
  host: PROCESS.ENV.DATABASE_URL,
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
  
  sequelize.authenticate()
    .then(console.log('connected to the database!'))
    .catch(err => console.log('error connecting to database!', err));

  let db ={}
  
  //Models
  db.User = require('../db/models/userModel')(sequelize, Sequelize);
  db.Like = require('../db/models/likeModel')(sequelize, Sequelize);
  db.Message = require('../db/models/messageModel')(sequelize, Sequelize);
  db.Category = require('../db/models/categoryModel')(sequelize, Sequelize);
  db.Follow = require('../db/models/followModel')(sequelize, Sequelize);
  db.Friend = require('../db/models/friendModel')(sequelize, Sequelize);
  db.HashTag = require('../db/models/hashTagModel')(sequelize, Sequelize);
  db.Participant = require('../db/models/participantModel')(sequelize, Sequelize);
  db.Post = require('../db/models/postModel')(sequelize, Sequelize);
  db.RoomStat = require('../db/models/roomStatModel')(sequelize, Sequelize);

for (var key in db) {
  console.log('@@@@@@@@@@@@SYNCING@@@@@@@@@@@: ', key)
  db[key].sync()
}

module.exports = db;
