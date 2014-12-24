var mongoose = require('mongoose')
var User = require('../models/user');
module.exports.controller = function(app) {

  	app.get('/login/:tel', function(req, res) {
		User.findOne({tel: req.params.tel}, function (err, users) {
			if (err) return handleError(err);
			res.json(users)
		})
  	})

  	app.get('/user/list/:tel', function(req, res) {
  		User.find({tel: req.params.tel}, function (err, users) {
			if (err) return handleError(err);
			res.json(users)
		})
  	})

}