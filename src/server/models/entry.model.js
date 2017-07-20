const mongoose = require('mongoose')

const entrySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, index: true, required: true },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
  date: { type: String, required: true, index: true },
  label: { type: String, required: true }
})

module.exports = mongoose.model('Entry', entrySchema)
