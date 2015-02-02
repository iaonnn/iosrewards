var mongoose = require('mongoose')
var Spacialrewards = require('../models/spacialrewards')

module.exports.controller = function(app) {

	app.get('/spacialrewards', function(req, res) {
		var obj = new Spacialrewards({
			_pId: 'P02',
      		point: 5
		})

		obj.save(function(err) {

			Spacialrewards.find({}, function(err, spacialrewards) {
				res.json(spacialrewards)
			})
		})
		
	})

	app.get('/spacialrewards/list', function(req, res) {
		Spacialrewards.find()
		.populate('_pId')
		.exec(function(err, spacialrewards) {
			res.json(spacialrewards)
		})
	})

	app.post('/spacialrewards/save', function(req, res) {
		Spacialrewards.findOne({_pId: req.body._pId}, function(err, obj) {
			if(!obj)
				obj = new Spacialrewards(req.body)
			else
				obj.point = req.body.point
			obj.save(function(err) {
				res.end('spacialrewards save')
			})
		})
	})

	app.get('/spacialrewards/delete/:pId', function(req, res) {
		Spacialrewards.remove({_pId: req.params.pId}, function(err) {
			res.end('spacialrewards delete')
		})
	})

}