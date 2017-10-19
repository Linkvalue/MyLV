const Joi = require('joi')
const Boom = require('boom')

module.exports = {
  method: 'POST',
  path: '/api/managers',
  config: {
    validate: {
      payload: {
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        client: Joi.string().required()
      }
    }
  },
  handler (req, res) {
    req.server.app.models.Manager.create(req.payload)
      .then((manager) => {
        res(manager)
      })
      .catch(err => res(Boom.wrap(err)))
  }
}
