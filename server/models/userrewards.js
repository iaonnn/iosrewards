var mongoose = require('mongoose')
var userrewardsSchema = new mongoose.Schema({
	_id: String,
	name: String,
	points: Number,
	update: Date
})

var Userrewards = mongoose.model('userrewards', userrewardsSchema)
module.exports = Userrewards