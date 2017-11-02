const RoomStat = require('../db/index').RoomStat;

module.exports = {
    addRoomstat: (req, res) => {
        RoomStat.create({
            category_id: req.body.category_id,
            person_count: req.body.person_count,
            host_id: req.body.host_id,
            duration: req.body.duration,
            room_info: req.body.room_info,
            video_url: req.body.video_url
        })
        .then((data) => {
            console.log('Data inserted correctly>>>>>>>> ')
            res.send(data)
        })
        .catch(err => {
            console.log("ERROR!!!!! >>>>> ", err)
            res.status(500).send(err)
        })
    },

    getRoomByHost: (req, res) => {
        RoomStat.findOne({
            where: {host_id: req.params.host_id},
            order: [[ 'room_id', 'DESC' ]],
        })
        .then((data) => {
            res.send(data)
        })
        .catch((err) =>{
            res.status(500).send(err)
        })
    },

    getRoomstat: (req, res) => {
        console.log(req.params.id)
        RoomStat.findAll({
            where: {room_info: Number(req.params.id)}
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
    },

    updateRoomstat: (req, res) => {
        RoomStat.update({
            room_info: req.body.room_info,
            video_url: req.body.video_url
        },
        { where: { room_info: req.params.id } })
        .then((data)=>{
            res.send(data);
        })
        .catch((err) => {
            res.send(err);
        })
    }
}