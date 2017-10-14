const Boom = require('boom')

const lvConnect = require('../../helpers/lvconnect.helper')

module.exports = {
  method: 'GET',
  path: '/api/lunches/{id}',
  handler (req, res) {
    req.server.app.models.Lunch.findById(req.params.id)
      .then(lunch =>
        lvConnect.api(`/users?ids=${lunch.attendants.join(',')}`)
          .then(res => res.json())
          .then(({ results: attendants }) => res.mongodb(Object.assign({}, lunch.toJSON(), { attendants }))))
      .catch(err => res(Boom.wrap(err)))
  }
}
