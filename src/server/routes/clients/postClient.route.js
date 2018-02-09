const Joi = require('joi')
const Boom = require('boom')

module.exports = {
  method: 'POST',
  path: '/api/clients',
  config: {
    validate: {
      payload: {
        name: Joi.string().required(),
        address: Joi.string().required(),
      },
    },
  },
  handler(req, res) {
    req.server.app.models.Client.create(req.payload)
      .then((client) => {
        res(client)
      })
      .catch(err => res(Boom.wrap(err)))
  },
}
