module.exports = {
  method: 'GET',
  path: '/api/holidays/me',
  async handler(req, res) {
    const holidays = await req.server.app.models.Holiday
      .where('user', req.auth.credentials.id)
      .sort('-date')
      .find()

    res.mongodb({ results: holidays })
  },
}
