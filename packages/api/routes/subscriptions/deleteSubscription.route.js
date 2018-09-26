const Boom = require('boom')

module.exports = {
  method: 'DELETE',
  path: '/api/subscriptions/{id}',
  handler(req, res) {
    return req.server.app.models.Subscription.deleteOne({ _id: req.params.id, user: req.auth.credentials.id })
      .then(() => res({ deleted: true }))
      .catch(err => Boom.wrap(err))
  },
}
