const Post = require('../db/index').post;
const axios = require('axios');

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

    getTweets: (req, res) => {
        console.log(req.params.id, 'hellooooooooooooooooooooo')
        var key = '6CBsjafaj3F2f1AMudmMW5xSB';
        var secret = 'BlZMYXZz3VsbObqi8tnDhT36UAxfdMqI2aTnRRBTUdBUeihIjj';
        var token = '920364354737864704-puoJWNWhL4nrETA9P9rwB7W25mZ821m';
        var tokenSecret = 'WaQV14WDuDOTYiL8o9qC5JmuwfW1woxkxApDGfdgYHems';
        var nonce = String(Math.random().toString(36).replace(/[^a-z]/, '').substr(2));
        var method = 'HMAC-SHA1';
        var timestamp = String(Date.now());
        var version = '1.0';
        // axios.get(`https://api.twitter.com/1.1/search/tweets.json`, {params: {
        //     oauth_consumer_key: key,
        //     oauth_token: token,
        //     oauth_signature_method: method,
        //     oauth_version: '1.0',
        //     oauth_nonce: nonce,
        //     oauth_timestamp: timestamp,
        //     search_expression: req.params.id
        // }})
        axios.get(`https://api.twitter.com/1.1/search/tweets.json?q=${req.params.id}`, {
            headers: { "Authorization": {
                oauth_consumer_key: key,
                oauth_token: token,
                oauth_signature_method: method,
                oauth_version: '1.0',
                oauth_nonce: nonce,
                oauth_timestamp: timestamp
              }
            }
        })
        .then((data) => {
            // res.send(data.data)
            var ids = data.data.statuses.map((status) => {return status.id_str})
            // res.send(ids)
            console.log(ids[0], 'thisis the tweet id')
            axios.get(`https://publish.twitter.com/oembed?url=https://twitter.com/someone/status/${ids[0]}`)
            .then((reply) => {
                res.send(reply.data)
            })
            .catch((err) => {
                res.status(500).send(err)
            })

        })
        .catch((err) => {
            console.log(err)
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