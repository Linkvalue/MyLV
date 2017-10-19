const path = require('path')

module.exports = {
  method: 'GET',
  path: '/{path*}',
  config: { auth: false },
  handler (req, res) {
    if (!path.extname(req.params.path)) {
      return res.file('dist/index.html')
    }

    return res.file(path.join('dist', req.params.path))
  }
}
