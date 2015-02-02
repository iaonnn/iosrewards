var express = require('express')
var path = require('path')
var fs = require('fs')
var bodyParser = require("body-parser")

var app = express()
app.use(bodyParser())

// database connection
var mongoose = require('mongoose');
var db_name = 'db_rewards'
//provide a sensible default for local development
mongodb_connection_string = 'mongodb://localhost:27017/' + db_name;
//take advantage of openshift env vars when available:
if(process.env.OPENSHIFT_MONGODB_DB_URL){
  mongodb_connection_string = process.env.OPENSHIFT_MONGODB_DB_URL + db_name;
}
mongoose.connect(mongodb_connection_string);

// dynamically include routes (Controller)
fs.readdirSync('./controllers').forEach(function (file) {
  if(file.substr(-3) == '.js') {
      route = require('./controllers/' + file);
      route.controller(app);
  }
});

app.get('/', function(req, res) {
	res.send('App is Running....')
})

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 2222
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'
 
app.listen(server_port, server_ip_address, function () {
  console.log( "Listening on " + server_ip_address + ", server_port " + server_port )
});