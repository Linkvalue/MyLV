const mongoose = require('mongoose')

const lunchSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId },
  endpoint: { type: String, required: true },
  keys: {
    auth: { type: String, required: true },
    p256dh: { type: String, required: true },
  },
})

module.exports = mongoose.model('Subscription', lunchSchema)
