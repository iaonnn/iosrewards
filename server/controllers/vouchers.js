var mongoose = require('mongoose')
var Voucher = require('../models/voucher')

module.exports.controller = function(app) {

	app.get('/voucher', function(req, res) {
		Voucher.findOne({tel: '222'}, function(err, items) {
			var obj = new Voucher({
				_exchangingId: '54c03d716b4fc8f825c61c6f',
				el: '222'
			})

			obj.save(function(err) {
				Voucher.find({}, function(err, items) {
					res.json(items)
				})
			})

		})		
	})

	app.get('/voucher/list', function(req, res) {
		Voucher.find()
		.populate('_exchangingId')
		.exec(function(err, items) {
			res.json(items)
		})
	})

	app.get('/voucher/list/:tel', function(req, res) {
		Voucher.find({tel: req.params.tel})
		.populate('_exchangingId')
		.exec(function(err, items) {
			res.json(items)
		})
	})

	app.post('/voucher/save', function(req, res) {
		console.log(req.body)
		var obj = new Voucher(req.body)
		
		obj.save(function(err) {
			res.end('voucher save')
		})	
	})

}