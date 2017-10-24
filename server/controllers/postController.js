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
        // request.get('https://api.twitter.com/1.1/search/tweets.json?q=' + req.params.id +
        //  '&result_type=recent&count=5', {headers: {Authorization: bearerheader}}, function(error, body, response) {
        //      if(error)
        //      console.log(error);
        //      else {
        //          body.body.statuses.map((status) => {
        //              res.json(JSON.parse(str_id))
        //          })
        //          res.json(JSON.parse(body.body));
        //      }
        //  })
    },
    // authorize: (req, res) => {
    //     var header = '6CBsjafaj3F2f1AMudmMW5xSB' + ":" + 'BlZMYXZz3VsbObqi8tnDhT36UAxfdMqI2aTnRRBTUdBUeihIjj';
    //     var encheader = new Buffer(header).toString('base64');
    //     var finalheader = 'Basic ' + encheader;
    //     request.post('https://api.twitter.com/oauth2/token', {form: {'grant_type': 'client_credentials'}, 
    //     headers: {Authorization: finalheader}}, function(error, response, body) {
    //         if(error) {
    //             return console.log(error);
    //         } else {
    //             var bearerToken = JSON.parse(body).access_token;
    //             console.log('TEST!!!==================================', bearerToken)
    //             axios.get(`https://api.twitter.com/1.1/search/tweets.json?q=${req.params.id}&result_type=recent&count=1`, {
    //                 headers: { Authorization: bearerToken}
    //             })
    //             .then((data) => {
    //                 // res.send(data.data)
    //                 var ids = data.data.statuses.map((status) => {return status.id_str})
    //                 // res.send(ids)
    //                 console.log(ids[0], 'thisis the tweet id')
    //                 axios.get(`https://publish.twitter.com/oembed?url=https://twitter.com/someone/status/${ids[0]}`)
    //                 .then((reply) => {
    //                     res.send(reply.data)
    //                 })
    //                 .catch((err) => {
    //                     console.log('first .then')
    //                     res.status(500).send(err)
    //                 })
        
    //             })
    //             .catch((err) => {
    //                 console.log('second .then', err)
    //                 res.status(500).send(err)
    //             })            
    //         }        
    //     })
    // },

    // getTweets: (req, res) => {
    //     console.log(req.params.id, 'hellooooooooooooooooooooo')
    //     var key = '6CBsjafaj3F2f1AMudmMW5xSB';
    //     var secret = 'BlZMYXZz3VsbObqi8tnDhT36UAxfdMqI2aTnRRBTUdBUeihIjj';
    //     var token = '920364354737864704-puoJWNWhL4nrETA9P9rwB7W25mZ821m';
    //     var tokenSecret = 'WaQV14WDuDOTYiL8o9qC5JmuwfW1woxkxApDGfdgYHems';
    //     var nonce = String(Math.random().toString(36).replace(/[^a-z]/, '').substr(2));
    //     var method = 'HMAC-SHA1';
    //     var timestamp = String(Date.now());
    //     var version = '1.0';
    //     // axios.get(`https://api.twitter.com/1.1/search/tweets.json`, {params: {
    //     //     oauth_consumer_key: key,
    //     //     oauth_token: token,
    //     //     oauth_signature_method: method,
    //     //     oauth_version: '1.0',
    //     //     oauth_nonce: nonce,
    //     //     oauth_timestamp: timestamp,
    //     //     search_expression: req.params.id
    //     // }})
    //     axios.get(`https://api.twitter.com/1.1/search/tweets.json?q=${req.params.id}`, {
    //         headers: { "Authorization": {
    //             oauth_consumer_key: key,
    //             oauth_token: token,
    //             oauth_signature_method: method,
    //             oauth_version: '1.0',
    //             oauth_nonce: nonce,
    //             oauth_timestamp: timestamp
    //           }
    //         }
    //     })
    //     .then((data) => {
    //         // res.send(data.data)
    //         var ids = data.data.statuses.map((status) => {return status.id_str})
    //         // res.send(ids)
    //         console.log(ids[0], 'thisis the tweet id')
    //         axios.get(`https://publish.twitter.com/oembed?url=https://twitter.com/someone/status/${ids[0]}`)
    //         .then((reply) => {
    //             res.send(reply.data)
    //         })
    //         .catch((err) => {
    //             res.status(500).send(err)
    //         })

    //     })
    //     .catch((err) => {
    //         console.log(err)
    //         res.status(500).send(err)
    //     })
    // },

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