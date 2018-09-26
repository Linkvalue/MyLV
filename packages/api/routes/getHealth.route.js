module.exports = {
  method: 'GET',
  path: '/api/health',
  config: { auth: false },
  handler(req, res) {
    res({ api: 'ok' })
  },
}
