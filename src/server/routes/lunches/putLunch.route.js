const Joi = require('joi')
const Boom = require('boom')
const config = require('config')

const hasRole = require('../../helpers/hasRole.pre')

module.exports = {
  method: 'PUT',
  path: '/api/lunches/{id}',
  config: {
    validate: {
      payload: {
        label: Joi.string(),
        date: Joi.date().iso(),
        attendees: Joi.array().min(1).items(Joi.string()),
      },
    },
    pre: [hasRole(config.cracra.lunchesRoles)],
  },
  handler (req, res) {
    req.server.app.models.Lunch.findOneAndUpdate({ _id: req.params.id }, { $set: req.payload })
      .then((lunch) => res.mongodb(lunch, ['owner']))
      .catch(err => res(Boom.wrap(err)))
  },
}
