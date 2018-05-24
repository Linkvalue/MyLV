module.exports = {
  method: 'GET',
  path: '/api/me',
  async handler(req, res) {
    const proofOfTransport = await req.server.plugins.proofOfTransports
      .getLatestProofOfTransport(req.auth.credentials.id)

    res.mongodb(Object.assign({}, req.auth.credentials, { proofOfTransport }))
  },
}
