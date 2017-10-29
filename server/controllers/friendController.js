const Friend = require('../db/index').Friend;

module.exports = {
    addFriend: (req, res) => {
        console.log(req.body.user_id, req.body.friend_id, '<<<<<<<<<<<<<<<<<<<<<')
        Friend.create({
            user_id: req.body.user_id,
            friend_id: req.body.friend_id
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
            where: {user_id: req.params.id}
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