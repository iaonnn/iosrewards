var mongoose = require('mongoose')
var Programlist = require('../models/programlist')

module.exports.controller = function(app) {

	app.get('/programlist', function(req, res) {
		var obj = new Programlist({
			_id: 'P02',
	      	name: 'ไมโลนมสด ปั่น',
	      	cost: 25,
		})

		obj.save(function(err) {

			Programlist.find({}, function(err, programlist) {
				res.json(programlist)
			})
		})
	})

	app.get('/programlist/list', function(req, res) {
		Programlist.find({}, function(err, programlist) {
			res.json(programlist)
		})
	})

}