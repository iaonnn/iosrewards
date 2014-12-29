var mongoose = require('mongoose')
var News = require('../models/news')

module.exports.controller = function(app) {

	app.get('/news', function(req, res) {
		var obj = new News({
			title: 'โปรโมชั่น พิเศษ',
	        content: 'ซื้อ 3 แถม 1',
	        date: new Date
		})

		obj.save(function(err) {

			News.find({}, function(err, news) {
				res.json(news)
			})
		})
	})

	app.get('/news/list', function(req, res) {
		News.find({}, function(err, news) {
			res.json(news)
		})
	})

	app.get('/news/list/:id', function(req, res) {
		News.findOne({_id : req.params.id}, function(err, news) {
			res.json(news)
		})
	})

	app.post('/news/save', function(req, res) {
		var obj = new News(req.body)

		obj.save(function(err) {
			res.end('news save')
		})
	})

	app.post('/news/update/:id', function(req, res) {        
        News.update({_id: req.params.id}, {$set: req.body}, function(err) {
            if (err) return handleError(err)
            res.end('news update')
        })
    })

    app.get('/news/remove/:id', function(req, res) {
    	News.remove({_id : req.params.id}, function(err) {
    		if (err) return handleError(err)
    		res.end('news remove')
    	})
    })
}