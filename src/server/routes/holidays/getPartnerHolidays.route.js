module.exports = {
  method: 'GET',
  path: '/api/partner/{id}/holidays',
  async handler(req, res) {
    const holidays = await req.server.app.models.Holiday
      .where('user', req.params.id)
      .sort('-date')
      .limit(5)
      .find()

    res.mongodb({ results: holidays })
  },
}
