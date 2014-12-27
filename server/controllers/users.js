var mongoose = require('mongoose')
var User = require('../models/user')
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
        User.update({tel: req.params.tel}, {$set: req.body}, function(err) {
            if (err) return handleError(err)
            console.log('User %s : update', req.params.tel)
            res.end('Success')
        })
    })

}