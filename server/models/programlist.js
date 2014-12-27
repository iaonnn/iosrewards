var mongoose = require('mongoose')
var programlistSchema = new mongoose.Schema({
      _id: String,
      name: String,
      cost: Number,
})

var Programlist = mongoose.model('programlist', programlistSchema)
module.exports = Programlist