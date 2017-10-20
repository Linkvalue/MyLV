const Boom = require('boom')
const config = require('config')

const hasRole = require('../../helpers/hasRole.pre')

module.exports = {
  method: 'DELETE',
  path: '/api/lunches/{id}',
  config: { pre: [hasRole(config.cracra.lunchesRoles)] },
  handler (req, res) {
    req.server.app.models.Lunch.deleteOne({ _id: req.params.id })
      .then(() => res({ deleted: true }))
      .catch(err => Boom.wrap(err))
  }
}
