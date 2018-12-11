const config = require('@cracra/config/server')

const hasRole = require('../../helpers/hasRole.pre')

module.exports = {
  method: 'DELETE',
  path: '/api/proofOfTransport/{id}',
  config: {
    pre: [hasRole(config.cracra.partnersRoles)],
  },
  async handler(req, res) {
    const { ProofOfTransport } = req.server.app.models

    await ProofOfTransport.deleteOne({ _id: req.params.id })

    res({ success: true })
  },
}
