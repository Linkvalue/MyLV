const Boom = require('boom')

module.exports = {
  method: 'DELETE',
  path: '/api/lunches/{id}',
  handler (req, res) {
    req.server.app.models.Lunch.deleteOne({ _id: req.params.id })
      .then(() => res({ deleted: true }))
      .catch(err => Boom.wrap(err))
  }
}
