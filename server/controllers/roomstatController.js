const RoomStat = require('../db/index').RoomStat;

module.exports = {
    addRoomstat: (req, res) => {
        RoomStat.create({
            category_id: req.body.category_id,
            room_id: req.body.room_id,
            person_count: req.body.count,
            host_id: req.body.host_id,
            duration: req.body.duration
        })
        .then((data) => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send(err)
        })
    },

    getRoomstat: (req, res) => {
        RoomStat.findAll({
            where: {room_id: req.params.id}
        })
        .then((data) => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send(err)
        })
    },

    deleteRoomstat: (req, res) => {
        RoomStat.destroy({
            where: {room_id: req.params.id}
        })
    }
}

