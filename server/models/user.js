var mongoose = require('mongoose')
var userSchema = new mongoose.Schema({
      name: String,
      lastname: String,
      tel: String,
      birthday: Date,
      gender: String,
      email: String,
      password: String,
      type: String
})

var User = mongoose.model('user', userSchema);
module.exports = User