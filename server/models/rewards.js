var mongoose = require('mongoose')
var rewardsSchema = new mongoose.Schema({
      total: Number,
      point: Number
})

var Rewards = mongoose.model('rewards', rewardsSchema)
module.exports = Rewards