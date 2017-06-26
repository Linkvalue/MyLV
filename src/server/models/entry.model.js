const mongoose = require('mongoose')

const entrySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId },
  date: { type: Date, required: true },
  label: { type: String, required: true }
})

module.exports = mongoose.model('Entry', entrySchema)
