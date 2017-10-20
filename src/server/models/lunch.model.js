const mongoose = require('mongoose')

const lunchSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId },
  label: { type: String, required: true },
  date: { type: Date, required: true },
  attendees: [{ type: mongoose.Schema.Types.ObjectId }],
})

module.exports = mongoose.model('Lunch', lunchSchema)
