var mongoose = require('mongoose')
var Userrewards = require('../models/userrewards')

module.exports.controller = function(app) {

	app.get('/userrewards', function(req, res) {
		var obj = new Userrewards({
			name: 'test test',
			tel: '222',
			points: 5,
			update: new Date
		})

		obj.save(function(err) {

			Userrewards.find({}, function(err, userrewards) {
				res.json(userrewards)
			})
		})
		
	})

}