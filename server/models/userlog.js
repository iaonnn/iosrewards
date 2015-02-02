var mongoose = require('mongoose')
var userlogSchema = new mongoose.Schema({
      date: Date,
      tel: String,
      point: Number
})

var Userlog = mongoose.model('userlog', userlogSchema)
module.exports = Userlog