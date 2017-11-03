const posts = require('./postData.json');
const likes = require('./likeData.json');
const friends = require('./friendData.json');
const users = require('./userData.json');

const seedPost = (table) => {
    posts.forEach((data) => {
        table.create(data)
        .then(()=> {
            console.log('success')
        })
        .catch((err) => {
            console.log(err, 'couldnt seed data');
        })
    })
}

const seedLikes = (table) => {
    likes.forEach((data) => {
        table.create(data)
        .then(()=> {
            console.log('success')
        })
        .catch((err) => {
            console.log(err, 'couldnt seed data');
        })
    })
}

const seedFriends = (table) => {
    friends.forEach((data) => {
        table.create(data)
        .then(()=> {
            console.log('success')
        })
        .catch((err) => {
            console.log(err, 'couldnt seed data');
        })
    })
}

const seedUsers = (table) => {
    users.forEach((data) => {
        table.create(data)
        .then(()=> {
            console.log('success')
        })
        .catch((err) => {
            console.log(err, 'couldnt seed data');
        })
    })
}

module.exports = {
    seedPosts, seedFriends, seedUsers, seedLikes
}
