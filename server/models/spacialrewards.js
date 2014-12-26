var mongoose = require('mongoose')
var spacialrewardsSchema = new mongoose.Schema({
      pId: String,
      point: Number
})

var Spacialrewards = mongoose.model('spacialrewards', spacialrewardsSchema)
module.exports = Spacialrewards