var Sequelize = require('sequelize');

const sequelize = new Sequelize('OrbitDB', 'ngdd', 'plantlife', {
  host: 'orbitdb.cxdawuxv7dpb.us-west-2.rds.amazonaws.com',
  port: 5432,
  dialect: 'postgres',
  dialectOptions: {
  ssl:'Amazon RDS'
  }});


  const db ={}
  
  db.Sequelize = Sequelize;
  db.sequelize = sequelize;
  
  //Models
  db.user = require('../db/models/userModel')(sequelize, Sequelize);
  db.like = require('../db/models/likeModel')(sequelize, Sequelize);
  db.message = require('../db/models/messageModel')(sequelize, Sequelize);
  db.category = require('../db/models/categoryModel')(sequelize, Sequelize);
  db.friend = require('../db/models/friendModel')(sequelize, Sequelize);
  db.hashTag = require('../db/models/hashTagModel')(sequelize, Sequelize);
  db.participant = require('../db/models/participantModel')(sequelize, Sequelize);
  db.post = require('../db/models/postModel')(sequelize, Sequelize);
  db.roomStat = require('../db/models/roomStatModel')(sequelize, Sequelize);

  
  //Associations
  
  //users
  db.user.hasMany(db.like);
  db.user.hasMany(db.message);
  db.user.hasMany(db.roomstat);
  db.user.hasMany(db.friend);

  //likes
  db.like.belongsTo(db.user);
  db.like.belongsTo(db.post);

  //messages
  db.message.belongsTo(db.user);
  db.message.belongsTo(db.friend);

  //room stats
  db.roomStat.belongsTo(db.user);
  db.roomState.hasMany(db.participant);

  //friends
  db.friend.belongsTo(db.user);

  //posts
  db.post.hasMany(db.hashTag);
  db.post.hasMany(db.like);
  db.post.belongsTo(db.category);

  //participants
  db.participant.belongsTo(db.roomStat);

  //categories
  db.category.hasMany(db.post);

  //hash tags
  db.hashTag.belongsTo(db.post);


//SYNC???
db.sync();

// db.authenticate()
sequelize.authenticate()
  .then(console.log('connected to the database!'))
  .catch(err => console.log('error connecting to database!', err));



module.exports = db;