const Like = require('../db/index').Like;

module.exports = {
    addLike: (req, res) => {
        Like.create({
            uid: req.body.uid,
            post_id: req.body.post_id
        })
        .then((data) => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send(err)
        })
    },

    getLike: (req, res) => {
        Like.findAll({
            where: {uid: req.params.id}
        })
        .then((data) => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send(err);
        })
    },

    deleteLike: (req, res) => {
        Like.destroy({
            where: {id: req.params.id}
        })
        .then(() => {
            res.send('deleted user')
        })
        .catch(err => {
            res.status(500).send(err);
        })
    }
}