var mongoose = require('mongoose')
var newsSchema = new mongoose.Schema({
      title: String,
      content: String,
      date: Date
})

var News = mongoose.model('news', newsSchema)
module.exports = News