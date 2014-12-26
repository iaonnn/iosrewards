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

}