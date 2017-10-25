const Post = require('../db/index').post;
const axios = require('axios');
const request = require('request');

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

    authorize: function(req, res) {
        var header = '6CBsjafaj3F2f1AMudmMW5xSB' + ':' + 'BlZMYXZz3VsbObqi8tnDhT36UAxfdMqI2aTnRRBTUdBUeihIjj';
        var encheader = new Buffer(header).toString('base64');
        var finalheader = 'Basic ' + encheader;
        
        request.post('https://api.twitter.com/oauth2/token', {form: {'grant_type': 'client_credentials'}, 
        headers: {Authorization: finalheader}}, function(error, response, body) {
            if(error)
            console.log(error);
            else {
                var bearertoken = JSON.parse(body).access_token;
                globalToken = bearertoken.data;
                res.json({success: true, data: bearertoken});
            }
            
        })
    },

    embed: function(req, res) {
        var id = req.params.id;
        axios.get(`https://publish.twitter.com/oembed?url=https://twitter.com/someone/status/${id}`)
        .then((data) => {
            res.json(data.data.html)
        })
        .catch((err) => {
            res.send(err);
        })
    },

    search: function(req, res) {
        var searchquery = req.body.query;
        var encsearchquery = encodeURIComponent(searchquery);
        var bearerheader = 'Bearer ' + req.body.token;
        axios.get('https://api.twitter.com/1.1/search/tweets.json?q=' + req.params.id +
        '&result_type=recent&count=5', {headers: {Authorization: bearerheader}})
        .then((data) => {
            // res.json(data.data.statuses)
            var ids = data.data.statuses.map((status) => {
                return status.id_str;
            })

            res.json(ids);
            
        })
        .catch((err) => {
            console.log(err)
            res.send(err)
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