var mongoose = require('mongoose')
var News = require('../models/news')

module.exports.controller = function(app) {

	app.get('/news', function(req, res) {
		var obj = new News({
			title: 'ทดสอบข่าว',
	        content: 'hello World',
	        date: new Date
		})

		obj.save(function(err) {

			News.find({}, function(err, news) {
				res.json(news)
			})
		})
		
	})

}