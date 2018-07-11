module.exports = {
  method: 'GET',
  path: '/api/me',
  async handler(req, res) {
    const profile = await req.server.app.models.Profile.findOne({ userId: req.auth.credentials.id })

    let proofOfTransport
    if (profile.hasProofOfTransport) {
      proofOfTransport = await req.server.plugins.proofOfTransports
        .getLatestProofOfTransport(req.auth.credentials.id)
    }

    res.mongodb(Object.assign({}, req.auth.credentials, { proofOfTransport, profile }))
  },
}
