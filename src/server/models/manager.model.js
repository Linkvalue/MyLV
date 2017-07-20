const mongoose = require('mongoose')

const managerSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true }
})

module.exports = mongoose.model('Manager', managerSchema)
