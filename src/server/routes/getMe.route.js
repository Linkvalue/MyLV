module.exports = {
  method: 'GET',
  path: '/api/me',
  handler (req, res) {
    res(req.auth.credentials)
  },
}
