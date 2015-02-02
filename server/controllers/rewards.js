var mongoose = require('mongoose')
var Rewards = require('../models/rewards')

module.exports.controller = function(app) {

	app.get('/rewards', function(req, res) {
		var obj = new Rewards({
			total: 100,
      		point: 1
		})

		obj.save(function(err) {

			Rewards.findOne({}, function(err, rewards) {
				res.json(rewards)
			})
		})
		
	})

	app.get('/rewards/list', function(req, res) {
		Rewards.findOne({}, function(err, rewards) {
			res.json(rewards)
		})
	})

	app.post('/rewards/save', function(req, res) {
		Rewards.findOne({}, function(err, rewards) {
			rewards.point = req.body.point
			rewards.total = req.body.total
			
			rewards.save(function(err) {
				res.end('rewards save')
			})
		})
	})

}