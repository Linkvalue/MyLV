const Joi = require('joi')
const Archiver = require('archiver')
const { promisify } = require('util')

const formatDate = require('../../helpers/formatDate.helper')

module.exports = {
  method: 'GET',
  path: '/api/proofOfTransportsZip',
  config: {
    validate: {
      query: {
        date: Joi.date().required(),
      },
    },
  },
  async handler(req, res) {
    const { date } = req.query
    const { gridfs } = req.server.plugins.mongodb
    const gridFindOne = promisify(gridfs.findOne.bind(gridfs))
    const { ProofOfTransport } = req.server.app.models

    const zip = Archiver.create('zip')

    const proofs = await ProofOfTransport.find({
      startingDate: { $lte: date },
      expirationDate: { $gt: date },
    })

    const filename = `Export proofs of transportation ${formatDate(date)}.zip`

    res(zip)
      .type('application/zip')
      .header('Content-Disposition', `attachment; filename=${filename}`)

    for (const proof of proofs) {
      const meta = await gridFindOne({ _id: proof.fileId })
      const readStream = await gridfs.createReadStream({ _id: meta._id })
      zip.append(readStream, { name: meta.filename })
    }

    zip.finalize()
  },
}
