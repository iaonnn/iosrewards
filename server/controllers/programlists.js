var mongoose = require('mongoose')
var Programlist = require('../models/programlist')

module.exports.controller = function(app) {

	app.get('/programlist', function(req, res) {
		var obj = new Programlist({
			id: 'P01',
	      	name: 'เนยนม',
	      	cost: 14,
		})

		obj.save(function(err) {

			Programlist.find({}, function(err, programlist) {
				res.json(programlist)
			})
		})
		
	})

}