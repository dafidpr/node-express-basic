const {v4: uuid} = require('uuid')
const userModel = require('../models/UserModel')

module.exports = {
    index:function(req, res){
        let key = {}
        if(req.query.key){
            key = {name: {$regex: req.query.key}}
        }
        userModel.find(key, function(error, result){
            if(error) console.log(error)
            const data = {
                content: "user/index",
                title: "User",
                users: result
            }
            res.render('components/main', data)
        })
    },

    create:function(req, res){
        const data = {
            content: "user/create",
            title: "Add New User"
        }
        res.render('components/main', data)
    },

    store:function(req, res) {

        const user = new userModel({
            username: req.body.username,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        user.save(function(error, result){
            if(error) {
                res.redirect('/users/create')
            } else {
                console.log(result)
                res.redirect('/users')
            }
        })
    },

    edit:function(req, res){
        const id = req.params.id
        userModel.findById(id, function(error, result){
            if(error) console.log(error)
            const data = {
                content: "user/edit",
                title: "Edit User",
                users: result
            }
            res.render('components/main', data)
        })
    },

    update: function(req, res) {
        const id = req.params.id
        userModel.updateOne({_id: id}, {
            username: req.body.username,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }, function(error){
            if(error) console.log(error)
            res.redirect('/users')
        })
    },

    destroy: function(req, res){
        const id = req.params.id
        userModel.deleteOne({_id: id}, function(error){
            if(error) console.log(error)

            res.redirect('/users')
        })
    }
}