var mongoose = require('mongoose')
var spacialrewardsSchema = new mongoose.Schema({
      _pId: {type: String, ref: 'programlist'},
      point: Number
})

var Spacialrewards = mongoose.model('spacialrewards', spacialrewardsSchema)
module.exports = Spacialrewards