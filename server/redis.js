const redis = require('redis');

const redis_host = '127.0.0.1';
const redis_port = 6379;
let redisClient = redis.createClient(redis_port, redis_host);

redisClient.on('error', (err) => {
    console.log('error', err)
})

// let promiser = (resolve, reject) => {
//     return (err, data) => {
//         if(err) reject (err);
//         resolve(data);
//     }
// }

// var get = (key) => {
//     return new Promise((resolve, reject) => {
//       client.get(key, promiser(resolve, reject));
//     });
// };
  
// var hgetall = (key) => {
//     return new Promise((resolve, reject) => {
//       if(key === null) reject();
//       client.hgetall(key, promiser(resolve, reject));
//     });
// };
  
// var zrevrangebyscore = (key, max, min) => {
//     return new Promise((resolve, reject) => {
//       client.zrevrangebyscore(key, max, min, promiser(resolve, reject));
//     });
// };



module.exports = {redisClient}