var mongoose = require('mongoose')
var userrewardsSchema = new mongoose.Schema({
	name: String,
	tel: String,
	points: Number,
	update: Date
})

var Userrewards = mongoose.model('userrewards', userrewardsSchema)
module.exports = Userrewards