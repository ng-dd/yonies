const Category = require('../db/index').category;

module.exports = {
    addCategory: (req, res) => {
        Category.create({
            name: req.body.name
        })
        .then((data) => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send(err)
        })
    },

    getCategory: (req, res) => {
        Category.findAll({
            where: {name: req.params.name}
        })
        .then((data) => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send(err)
        })
    },

    deleteCategory: (req, res) => {
        Category.destroy({
            where: {id: req.params.id}
        })
        .then(() => {
            res.send('deleted category')
        })
        .catch((err) => {
            res.status(500).send(err)
        })
    }
}