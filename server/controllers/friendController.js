const Friend = require('../db/index').friend;

module.exports = {
    addFriend: (req, res) => {
        Friend.create({
            user_id: req.body.userId,
            friend_id: req.body.friendId
       })
       .then((data) => {
           res.send(data)
       })
       .catch(err => {
           res.status(500).send(err)
       })
    },

    getFriend: (req, res) => {
        Friend.findAll({
            where: {user_id: req.params.userId}
        })
        .then((data) => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send(err)
        })
    },

    deleteFriend: (req, res) => {
        Friend.destroy({
            where: {id: req.params.userId}
        })
        .then(() => {
            res.send('deleted friend')
        })
        .catch(err => {
            res.status(500).send(err)
        })
    }
}