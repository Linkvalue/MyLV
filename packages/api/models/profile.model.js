const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, index: true },
  hasProofOfTransport: { type: Boolean, default: false },
})

module.exports = mongoose.model('Profile', profileSchema)
