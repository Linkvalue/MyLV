const Joi = require('joi')
const Boom = require('boom')
const config = require('@cracra/config/server')

const hasRole = require('../../helpers/hasRole.pre')

module.exports = {
  method: 'POST',
  path: '/api/lunches',
  config: {
    validate: {
      payload: {
        label: Joi.string().required(),
        date: Joi.date().iso().required(),
        attendees: Joi.array().min(1).items(Joi.string()).required(),
      },
    },
    pre: [hasRole(config.cracra.lunchesRoles)],
  },
  handler(req, res) {
    req.server.app.models.Lunch.create(Object.assign({ owner: req.auth.credentials.id }, req.payload))
      .then(lunch => res.mongodb(lunch, ['owner']))
      .catch(err => res(Boom.wrap(err)))
  },
}
