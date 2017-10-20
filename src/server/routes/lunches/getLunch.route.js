const Boom = require('boom')
const config = require('config')

const lvConnect = require('../../helpers/lvconnect.helper')
const hasRole = require('../../helpers/hasRole.pre')

module.exports = {
  method: 'GET',
  path: '/api/lunches/{id}',
  config: { pre: [hasRole(config.cracra.lunchesRoles)] },
  handler (req, res) {
    req.server.app.models.Lunch.findById(req.params.id)
      .then(lunch =>
        lvConnect.api(`/users?ids=${lunch.attendees.join(',')}`)
          .then(res => res.json())
          .then(({ results: attendees }) => res.mongodb(Object.assign({}, lunch.toJSON(), { attendees }))))
      .catch(err => res(Boom.wrap(err)))
  },
}
