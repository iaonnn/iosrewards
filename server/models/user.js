var mongoose = require('mongoose')
      ,Schema = mongoose.Schema
      userSchema = new Schema( {
      		name: String,
      		lastname: String,
      		tel: String,
      		birthday: Date,
      		gender: String,
      		email: String,
          	password: String
      }),
User = mongoose.model('user', userSchema);

module.exports = User;