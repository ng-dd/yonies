const RoomStat = require('../db/index').roomstat;

module.exports = {
    addRoomstat: (req, res) => {
        RoomStat.create({
            category_id: req.body.categoryId,
            room_id: req.body.roomId,
            person_count: req.body.count,
            host_id: req.body.hostId,
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
            where: {room_id: req.body.roomId}
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

