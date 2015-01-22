var mongoose = require('mongoose')
var Exchanging = require('../models/exchanging')

module.exports.controller = function(app) {

	app.get('/exchanging', function(req, res) {
		var obj = new Exchanging({
			points: 15,
		    detail: 'รับฟรี ปังเย็น 2 ถ้วย',
		    picUrl: '',
		    expire: new Date
		})

		obj.save(function(err) {

			Exchanging.find({}, function(err, items) {
				res.json(items)
			})
		})
	})

	app.get('/exchanging/list', function(req, res) {

		Exchanging.find({}, function(err, items) {
			res.json(items)
		})
	})

}