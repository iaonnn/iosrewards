var mongoose = require('mongoose')
var User = require('../models/user');
module.exports.controller = function(app) {

/**
 * a home page route
 */
  app.get('/signup', function(req, res) {
      // any logic goes here
      res.end('users/signup')
  });

/**
 * About page route
 */
  	app.get('/login', function(req, res) {
      	var user = new User({name: 'ronsc jannalao', password: '03512344', birthday: new Date, tel: '111'})
      	user.save(function (err) {
		  	if (err) return handleError(err);
		  	
		  	User.find({}, function (err, users) {
			  if (err) return handleError(err);
			  	//console.log(users) 
			  	res.json(users)
			})
		})
  	});

  	app.get('/user/create', function(req, res) {
  		
  	}) 

  	app.get('/user/:tel', function(req, res) {
  		User.find({tel: req.params.tel}, function (err, users) {
			if (err) return handleError(err);
			res.json(users)
		})
  	})

}