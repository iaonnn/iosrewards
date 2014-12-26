var mongoose = require('mongoose')
var Sellpoint = require('../models/sellpoint')

module.exports.controller = function(app) {

	app.get('/sellpoint', function(req, res) {
		var obj = new Sellpoint({
			date: new Date,
		    tel: '222',
		    total: 285,
		    point: 1
		})

		obj.save(function(err) {

			Sellpoint.find({}, function(err, sellpoint) {
				res.json(sellpoint)
			})
		})
		
	})

}