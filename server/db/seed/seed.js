const posts = require('./postData.json');
const likes = require('./likeData.json');
const friends = require('./friendData.json');
const users = require('./userData.json');
const categories = require('./categoryData.json');
const follows = require('./followingData.json');


const seedCategories = (table) => {
    categories.forEach((data) => {
        table.create(data)
        .catch((err) => {
            console.log('couldnt seed data', err)
        })
    })
}

const seedFollows = (table) => {
    follows.forEach((data) => {
        table.create(data)
        .catch((err) => {
            console.log('couldnt seed data', err)
        })
    })
}

const seedPosts = (table) => {
    posts.forEach((data) => {
        table.create({
            type: data.type,
            text: data.text,
            like_count: data.like_count
        })
        .catch((err) => {
            console.log(err, 'couldnt seed data');
        })
    })
}

const seedLikes = (table) => {
    likes.forEach((data) => {
        table.create(data)
        .catch((err) => {
            console.log(err, 'couldnt seed data');
        })
    })
}

const seedFriends = (table) => {
    friends.forEach((data) => {
        table.create(data)
        .catch((err) => {
            console.log(err, 'couldnt seed data');
        })
    })
}

const seedUsers = (table) => {
    users.forEach((data) => {
        table.create(data)
        .catch((err) => {
            console.log(err, 'couldnt seed data');
        })
    })
}

module.exports = {
    seedPosts, seedFriends, seedUsers, seedLikes
}
