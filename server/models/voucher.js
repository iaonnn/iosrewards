var mongoose = require('mongoose')
var voucherSchema = new mongoose.Schema({
    _exchangingId: {type: mongoose.Schema.Types.ObjectId, ref: 'exchanging'},
    tel: String,
    status: { type: Boolean, default: false }
})

module.exports = mongoose.model('voucher', voucherSchema)