module.exports = {
  method: 'GET',
  path: '/api/me',
  async handler(req, res) {
    const { ProofOfTransport } = req.server.app.models

    const proofOfTransport = await ProofOfTransport.findOne({
      userId: req.auth.credentials.id,
    }).sort({ expirationDate: -1 })

    res.mongodb(Object.assign({}, req.auth.credentials, { proofOfTransport }))
  },
}
