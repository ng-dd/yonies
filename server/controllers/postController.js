const Post = require('../db/index').post;
const axios = require('axios');
const request = require('request');

module.exports = {
    addPost: (req, res) => {
        Post.create({
            post_url: req.body.post_url,
            post_like_count: req.body.post_like_count,
            comment: req.body.comment,
            comment_like_count: req.body.comment_like_count,
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

    // search recent tweets
    // search: function(req, res) {
    //     var searchquery = req.body.query;
    //     var encsearchquery = encodeURIComponent(searchquery);
    //     var bearerheader = 'Bearer ' + req.body.token;
    //     axios.get('https://api.twitter.com/1.1/search/tweets.json?q=' + req.params.id +
    //     '&result_type=recent&count=5', {headers: {Authorization: bearerheader}})
    //     .then((data) => {
    //         // res.json(data.data.statuses)
    //         var ids = data.data.statuses.map((status) => {
    //             return status.id_str;
    //         })

    //         res.json(ids);
            
    //     })
    //     .catch((err) => {
    //         console.log(err)
    //         res.send(err)
    //     })
    // },

    //search tweets by user
    insta: function(req, res) {
        // var userid = req.params.id;
        axios.get('https://api.instagram.com/v1/users/244021744/media/recent/?access_token=244021744.485c416.b94164e94429496f8acee5fb4af8e790')
        .then((data) => {
            res.json(data.data);
            // res.json(data.data.body)
            console.log(data, 'data<<<<')
        })
        .catch((err) => {
            console.log(err, 'ERR<<<<<<<<')
            res.send(err);
        })
    },

    search: function(req, res) {
        var searchquery = req.body.query;
        var encsearchquery = encodeURIComponent(searchquery);
        var bearerheader = 'Bearer ' + req.body.token;
        axios.get('https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=' + req.params.id +
        '&count=5&result_type=recent', {headers: {Authorization: bearerheader}})
        .then((data) => {
            // res.json(data.data.statuses)
            // console.log(data)
            var ids = data.data.map((status) => {
                return status.id_str;
            })

            res.json(ids);
            
        })
        .catch((err) => {
            console.log(err)
            res.send(err)
        })
    },

    //so theyll search for a youtube video if they like it,then get the tags from it and save it to somewhere
    //searching celebs should show us youtube videos tweets instagram posts and twitch videos  
    //so when follow a celeb, user will collect tags relating to the posts of each celeb,
    //user dashboard will have posts relating to a tags of the user

    //get tags from a youtube video
    youTubeVideoTags: function(req, res) {
        axios.get(`https://www.googleapis.com/youtube/v3/videos?key=AIzaSyCs8PIBc9_thyv60k4mFAtlz1caOoU-aMY&fields=items(snippet(title,description,tags))&part=snippet&id=${req.params.id}`)
        .then((data) => {
            console.log('got the youtube tag data')
            console.log(data.data)
            res.json(data.data)
        })
        .catch(err => {
            console.log('couldnt get youtube tags')
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