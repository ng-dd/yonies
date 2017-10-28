const Message = require('../db/index').Message;

module.exports = {
    addMessage: (req, res) => {
        Message.create({
            video_dm: req.body.video_dm,
            message_dm: req.body.message_dm,
            user_id: req.body.user_id,
            friend_id: req.body.friend_id
        })
    },

    getMessage: (req, res) => {
        Message.findAll({
            where: {user_id: req.params.user_id}
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