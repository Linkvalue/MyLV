const moment = require('moment')
const Joi = require('joi')
const Archiver = require('archiver')
const { promisify } = require('util')
const config = require('config')

const hasRole = require('../../helpers/hasRole.pre')

module.exports = {
  method: 'GET',
  path: '/api/proofOfTransport/download',
  config: {
    validate: {
      query: {
        date: Joi.date(),
      },
    },
    pre: [hasRole(config.cracra.partnersRoles)],
  },
  async handler(req, res) {
    const { date = moment().format('YYYY-MM-DD') } = req.query
    const { gridfs } = req.server.plugins.mongodb
    const gridFindOne = promisify(gridfs.findOne.bind(gridfs))
    const { ProofOfTransport } = req.server.app.models

    const zip = Archiver.create('zip')

    const proofs = await ProofOfTransport.find({
      startingDate: { $lte: date },
      expirationDate: { $gt: date },
    })

    const filename = `${date}-Justificatifs-de-transport.zip`

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
