const Message = require('../db/index').message;

module.exports = {
    addMessage: (req, res) => {
        Message.create({
            video_dm: req.body.videoDm,
            message: req.body.message,
            user_id: req.body.userId,
            friend_id: req.body.friendId
        })
    },

    getMessage: (req, res) => {
        Message.findAll({
            where: {user_id: req.params.userId}
        })
        .then((data) => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send(err)
        })
    },

    deleteMessage: (req, res) => {
        Message.detroy({
            where: {id: req.params.id}
        })
        .then(() => {
            res.send('deleted message')
        })
        .catch(err => {
            res.status(500).send(err);
        })
    }
}