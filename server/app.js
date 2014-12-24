var express = require('express')
var path = require('path')
var fs = require('fs')
var bodyParser = require("body-parser")

var app = express()
app.use(bodyParser())

// database connection
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mydb');

// dynamically include routes (Controller)
fs.readdirSync('./controllers').forEach(function (file) {
  if(file.substr(-3) == '.js') {
      route = require('./controllers/' + file);
      route.controller(app);
  }
});

app.listen(2222, function() {
	console.log('server on port 2222')
})
