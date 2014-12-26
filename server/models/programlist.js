var mongoose = require('mongoose')
var programlistSchema = new mongoose.Schema({
      id: String,
      name: String,
      cost: Number,
})

var Programlist = mongoose.model('programlist', programlistSchema)
module.exports = Programlist