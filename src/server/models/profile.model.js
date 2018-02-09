const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, index: true },
})

module.exports = mongoose.model('Profile', profileSchema)
