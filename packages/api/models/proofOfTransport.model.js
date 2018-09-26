const mongoose = require('mongoose')

const { ObjectId } = mongoose.Schema.Types

const proofOfTransportSchema = new mongoose.Schema({
  user: { type: ObjectId, index: true, required: true },
  fileId: { type: ObjectId, required: true },
  expirationDate: { type: Date, index: true, required: true },
  startingDate: { type: Date, index: true, required: true },
})

module.exports = mongoose.model('ProofOfTransport', proofOfTransportSchema)
