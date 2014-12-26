var mongoose = require('mongoose')
var Spacialrewards = require('../models/spacialrewards')

module.exports.controller = function(app) {

	app.get('/spacialrewards', function(req, res) {
		var obj = new Spacialrewards({
			pId: 'P01',
      		point: 5
		})

		obj.save(function(err) {

			Spacialrewards.find({}, function(err, spacialrewards) {
				res.json(spacialrewards)
			})
		})
		
	})

}