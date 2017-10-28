const User = require('../db/index').User;
const redis = require('../redis.js');

module.exports = {
    addUser: (req, res) => {
        User.create({
            username: req.body.username,
            uid: req.body.uid,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            admin_status: req.body.admin_status,
            age: req.body.age,
            gender: req.body.gender,
            street_address: req.body.street_address,
            city: req.body.city,
            state: req.body.state,
            zip_code: req.body.zip_code,
            email: req.body.email,
            phone: req.body.phone
        })
        .then((data) => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send(err)
        })
    },

    // getUser: (req, res) => {
    //     if (!redis.redisClient.get(req.params.id)) {
    //         User.findAll({where: {username: req.params.id}})
    //         .then((data) => {
    //             redis.redisClient.set(`userData${req.params.id}`, data)
    //         })
    //         .catch((err) => {
    //             res.status(500).send(err);
    //         })
    //     } else {
    //         res.send(JSON.parse(redis.redisClient.get(req.params.id)));
    //     }
    // },

    getUser: (req, res) => {
        console.log(req.params.id)
        redis.redisClient.get(JSON.stringify(req.params.id), (err, reply) => {
            if (reply === null) {
                User.findAll({where: {username: req.params.id}})
                .then((data) => {
                    console.log(data, req.params.id)
                    redis.redisClient.set(JSON.stringify(req.params.id), JSON.stringify(data))
                    res.send(data)
                })
                .catch((err) => {
                    res.status(500).send(err)
                })
            } else {
                res.send(JSON.parse(reply))
            }
        })
    },

    deleteUser: (req, res) => {
        User.destroy({
            where: {username: req.params.id}
        })
        .then(() => {
            res.send('deleted user')
        })
        .catch(err => {
            res.status(500).send(err);
        })
    }
}
