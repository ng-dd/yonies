const Hash = require('../db/index').hashTag;

module.exports = {
    addHash: (req, res) => {
        Hash.create({
            post_id: req.body.postId,
            label: req.body.label
        })
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            res.status(500).send(err)
        })
    },

    getHash: (req, res) => {
        Hash.findAll({
            where: {label: req.params.id}
        })
        .then((data) => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send(err)
        })
    },

    deletePost: (req, res) => {
        Hash.destroy({
            where: {id: req.params.id}
        })
        .then(() => {
            res.send('deleted hash')
        })
        .catch(err => {res.status(500).send(err)})
    }
}