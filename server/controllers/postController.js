const Post = require('../db/index').post;

module.exports = {
    addPost: (req, res) => {
        Post.create({
            post_url: req.body.url,
            post_like_count: req.body.postlike,
            comment: req.body.comment,
            comment_like_count: req.body.commentlike,
            parent: req.body.parent
        })
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            res.status(500).send(err)
        })
    },

    getPost: (req, res) => {
        Post.findAll({
            where: {post_url: req.params.id}
        })
        .then((data) => {
            console.log('retrieving post data')
            res.send(data)
        })
        .catch(err=> {
            res.status(500).send(err)
        })
    },

    deletePost: (req, res) => {
        Post.destroy({
            where: {id: req.params.id}
        })
        .then(() => {
            res.send('deleted post')
        })
        .catch(err => {
            res.status(500).send(err);
        })
    }
}