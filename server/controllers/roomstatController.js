const RoomStat = require('../db/index').RoomStat;

module.exports = {
    addRoomstat: (req, res) => {
        RoomStat.create({
            category_id: req.body.category_id,
            person_count: req.body.person_count,
            host_id: req.body.host_id,
            duration: req.body.duration,
            room_info: req.body.room_info
        })
        .then((data) => {
            console.log('Data inserted correctly>>>>>>>> ', data)
            res.send(data)
        })
        .catch(err => {
            console.log("ERROR!!!!! >>>>> ", err)
            res.status(500).send(err)
        })
    },

    getRoomstat: (req, res) => {
        console.log(req.params.id)
        RoomStat.findAll({
            where: {room_id: Number(req.params.id)}
        })
        .then((data) => {
            res.send(data)
        })
        .catch(err => {
            console.log('some bullshit error>>>>> ', err)
            res.status(500).send(err)
        })
    },

    deleteRoomstat: (req, res) => {
        RoomStat.destroy({
            where: {room_id: req.params.id}
        })
    },

    updateRoomstat: (req, res) => {
        RoomStat.update({room_id: req.body.room_id},
        { where: { room_id: req.params.id } })
        .then((data)=>{
            res.send(data);
        })
        .catch((err) => {
            res.send(err);
        })
    }
}