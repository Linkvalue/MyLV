const Joi = require('joi')
const Boom = require('boom')

module.exports = {
  method: 'POST',
  path: '/api/lunches',
  config: {
    validate: {
      payload: {
        label: Joi.string().required(),
        date: Joi.date().iso().required(),
        attendants: Joi.array().min(1).items(Joi.string()).required()
      }
    }
  },
  handler (req, res) {
    req.server.app.models.Lunch.create(Object.assign({ owner: req.auth.credentials.id }, req.payload))
      .then((lunch) => res.mongodb(lunch, ['owner']))
      .catch(err => res(Boom.wrap(err)))
  }
}
