const { promisify } = require('util')
const config = require('config')

const hasRole = require('../../helpers/hasRole.pre')

module.exports = {
  method: 'GET',
  path: '/api/proofOfTransport/{id}/download',
  config: {
    pre: [hasRole(config.cracra.partnersRoles)],
  },
  async handler(req, res) {
    const { gridfs } = req.server.plugins.mongodb
    const gridFindOne = promisify(gridfs.findOne.bind(gridfs))
    const { ProofOfTransport } = req.server.app.models

    const proof = await ProofOfTransport.findById(req.params.id)
    const meta = await gridFindOne({ _id: proof.fileId })
    const readStream = await gridfs.createReadStream({ _id: meta._id })

    res(readStream)
      .type('application/zip')
      .header('Content-Disposition', `attachment; filename=${meta.filename}`)
  },
}
