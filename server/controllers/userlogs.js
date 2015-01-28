var mongoose = require('mongoose')
var Userlog = require('../models/userlog')

module.exports.controller = function(app) {

	app.get('/userlog', function(req, res) {
		var obj = new Userlog({
			date: new Date,
		    tel: '222',
		    point: 5
		})

		obj.save(function(err) {

			Userlog.find({}, function(err, items) {
				res.json(items)
			})
		})
		
	})

	app.get('/userlog/list', function(req, res) {
		Userlog.find({}, function(err, items) {
			res.json(items)
		})
	})

	app.post('/userlog/save', function(req, res) {
		var obj = new Userlog(req.body)
		obj.save(function(err) {
			res.end('userlog')
		})
	})

	app.get('/userlog/:tel/balance', function(req, res) {
		Userlog.aggregate([
			{ 
				$match: { tel: req.params.tel } 
			},
			{
				$group : {
					_id : null,
					points : { $sum : "$point" },
					count : { $sum : 1 }
				}
			}
		], function(err, result) {
			res.json(result[0])
		})
	})

	app.get('/userlog/:tel/update', function(req, res) {
		Userlog.aggregate([
			{ $match: { tel: req.params.tel } },
			{ $sort: { date:-1 } },
			{ $limit: 1 }
		], function(err, result) {
			res.json(result[0])
		})
	})

}