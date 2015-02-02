var mongoose = require('mongoose')
var Userrewards = require('../models/userrewards')

module.exports.controller = function(app) {

	app.get('/userrewards', function(req, res) {
		var obj = new Userrewards({
			_id: '222',
			name: 'test test',
			points: 5,
			update: new Date
		})

		obj.save(function(err) {

			Userrewards.find({}, function(err, userrewards) {
				res.json(userrewards)
			})
		})
	})

	app.get('/userrewards/:tel', function(req, res) {
		Userrewards.findOne({_id: req.params.tel}, function(err, userrewards) {
			res.json(userrewards)
		})
	})

}