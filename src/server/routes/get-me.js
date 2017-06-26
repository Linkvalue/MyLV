const lvConnect = require('../helpers/lvconnect.helper')

module.exports = {
  method: 'GET',
  path: '/api/me',
  handler (req, res) {
    lvConnect.getUserProfile()
      .then((response) => res(response).code(response.statusCode || 200))
      .catch((err) => res(err).code(err.statusCode))
  }
}
