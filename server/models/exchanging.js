var mongoose = require('mongoose')
var exchangingSchema = new mongoose.Schema({
    points: Number,
    detail: String,
    picUrl: String,
    expire: Date
})

module.exports = mongoose.model('exchanging', exchangingSchema)