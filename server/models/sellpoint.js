var mongoose = require('mongoose')
var sellpointSchema = new mongoose.Schema({
      date: Date,
      tel: String,
      total: Number,
      point: Number
})

var Sellpoint = mongoose.model('sellpoint', sellpointSchema)
module.exports = Sellpoint