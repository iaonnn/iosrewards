var mongoose = require('mongoose')
var Sellpoint = require('../models/sellpoint')
var Userrewards = require('../models/userrewards')

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

	app.post('/sellpoint/save', function(req, res) {
		var obj = new Sellpoint(req.body)
		var fullName = req.body.fullName

		obj.save(function(err) {
			Userrewards.findOne({_id : obj.tel}, function(err, userrewards) {
				if(!userrewards) {
					userrewards = new Userrewards({
						_id : obj.tel,
						name: fullName,
						points: obj.point,
						update: new Date
					})
				} else {
					userrewards.points += obj.point
					userrewards.update = new Date
				}
				userrewards.save(function(err) {
					res.end('sellpoint save')
				})
			})
		})
	})
	
	app.get('/sellpoint/list', function(req, res) {
		Sellpoint.find()
		.sort('-date')
		.exec(function(err, sellpoint) {
			res.json(sellpoint)
		})
	})

	app.get('/sellpoint/report', function(req, res) {
		Sellpoint.aggregate([{
			$group : {
				_id : { 
					month: { $month: "$date" }, 
					day: { $dayOfMonth: "$date" }, 
					year: { $year: "$date" } 
				},
				sellpoint : { 
					$push : {
						tel: "$tel",
     					total: "$total",
     					point: "$point",
     					date: "$date"
      				}
      			}
			}
		}], function(err, result) {
			res.json(result)
		})
	})

	app.get('/sellpoint/report/day', function(req, res) {
		console.log('day')
		Sellpoint.aggregate([{
			$group : {
				_id : { 
					day 	: { $dayOfMonth: "$date" }, 
					month 	: { $month: "$date" }, 
					year 	: { $year: "$date" } 
				},
				total : { $sum : "$total" }
			}
		}], function(err, result) {
			res.json(result)
		})
	})

	app.get('/sellpoint/report/month', function(req, res) {
		console.log('month')
		Sellpoint.aggregate([{
			$group : {
				_id : { 
					month 	: { $month: "$date" }, 
					year 	: { $year: "$date" } 
				},
				total : { $sum : "$total" }
			}
		}], function(err, result) {
			res.json(result)
		})
	})

	app.get('/sellpoint/report/year', function(req, res) {
		console.log('year')
		Sellpoint.aggregate([{
			$group : {
				_id : {  
					year 	: { $year: "$date" } 
				},
				total : { $sum : "$total" }
			}
		}], function(err, result) {
			res.json(result)
		})
	})
}