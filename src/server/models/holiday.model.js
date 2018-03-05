const mongoose = require('mongoose')

const lunchSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, index: true },
  date: { type: Date, required: true },
  title: { type: String },
  comment: { type: String },
  status: { type: String, required: true, default: 'pending' },
  periods: [{
    label: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
  }],
})

module.exports = mongoose.model('Holiday', lunchSchema)
