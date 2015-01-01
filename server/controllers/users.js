var mongoose = require('mongoose')
var User = require('../models/user')
var Userrewards = require('../models/userrewards')

module.exports.controller = function(app) {

    app.get('/login/:tel', function(req, res) {
        User.findOne({tel: req.params.tel}, function (err, users) {
            if (err) return handleError(err);
            res.json(users)
        })
    })

    app.get('/user/list/:tel', function(req, res) {
        User.findOne({tel: req.params.tel}, function (err, user) {
            if (err) return handleError(err);
            res.json(user)
        })
    })

    app.get('/user/create/:type/:tel/:pass', function(req, res) {
        var user = new User({
            name: 'test',
            lastname: 'testtest',
            tel: req.params.tel,
            birthday: new Date,
            gender: 'M',
            email: 'test@test.com',
            password: req.params.pass,
            type: req.params.type
        })

        user.save(function(err) {
            if(err) return handleError(err);
            
            User.find({}, function (err, user) {
              if (err) return handleError(err);
                res.json(user)
            })
        })
    })

    app.get('/user/list', function(req, res) {
        User.find({type: 'USER'}, function (err, users) {
            if (err) return handleError(err);
            res.json(users)
        })
    })

    app.post('/user/update/:tel', function(req, res) {  
        var name = req.body.name + ' ' + req.body.lastname      
        User.update({tel: req.params.tel}, {$set: req.body}, function(err) {
            if (err) return handleError(err)
            Userrewards.findOne({_id : req.params.tel}, function(err, userrewards) {
                userrewards.name = name
                userrewards.save(function(err) {
                    console.log(name)
                    console.log('User %s : update', req.params.tel)
                    res.end('Success')
                })
            })
        })
    })

    app.post('/user/reg', function(req, res) {
        var data = req.body
        console.log(data)

        var reg = new User(req.body)
        reg.save(function (err) {
            if (err) return handleError(err);
            res.end('reg success')
        })
    }) 

}