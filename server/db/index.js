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

  
  //Associations
  
  db.user.hasMany(db.like);
  db.user.hasMany(db.message);
  db.user.hasMany(db.roomstat);
  db.user.hasMany(db.friend);

  db.like.belongsTo(db.user);
  db.like.belongsTo(db.post);

  db.message.belongsTo(db.user);
  db.message.belongsTo(db.friend);


db.authenticate()
  .then(console.log('connected to the database!'))
  .catch(err => console.log('error connecting to database!', err));

module.exports = db;