var Sequelize = require('sequelize');
require('dotenv').config();
const Promise = require('bluebird');
// var dbUrl = require('../../dburl');
var seed = require('./seed/seed');

const sequelize = new Sequelize('yoniesDB', 'ngdd', 'plantlife', {
  host: process.env.DATABASE_URL,
  port: 5432,
  dialect: 'postgres',
  dialectOptions: {
    ssl:'Amazon RDS'
  },
  pool: {
    max: 20,
    min: 0,
    idle: 20000,
    acquire: 20000
  }});

// var sequelize = new Sequelize('postgres://gqhmxfxh:0moqyFAzfF1UOx3Nw8kKuly4cdpyH3f5@pellefant.db.elephantsql.com:5432/gqhmxfxh', {dialect: "postgres"});
  
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

 const bs = [[seed.seedPosts, db.Post], [seed.seedUsers,db.User], [seed.seedLikes, db.Like], [seed.seedFriends, db.Friend]];
 let counter = 0;
 
const sync = () =>{
  return new Promise((resolve, reject)=> {
    for (var key in db) {
      console.log('@@@@@@@@@@@@SYNCING@@@@@@@@@@@: ', key)
      db[key].sync({force: true})
    }
    resolve()
  })
}

sync()
.then(()=>{
  let counter = 1
  bs.forEach((fn) => {
    setTimeout(()=>{
      console.log(fn[0], fn[1])
      fn[0](fn[1])

    }, 1000* counter)
    counter++;
  })
})
      // console.log(db[key], 'please')
      // seed.bs[counter](db[key]);
      // counter++;
    //   setTimeout(function() {
    //     seed.seedPosts(db)
    //     seed.seedUsers(db.User)
    //     seed.seedLikes(db.Like)
    //     seed.seedFriends(db.Friend)
    //  }, 3000)
  //   })
  // }



module.exports = db;
