const Joi = require('joi')
const Boom = require('boom')

module.exports = {
  method: 'POST',
  path: '/api/subscriptions',
  config: {
    validate: {
      payload: Joi.object({
        endpoint: Joi.string().required(),
        keys: Joi.object({
          auth: Joi.string().required(),
          p256dh: Joi.string().required(),
        }).required(),
      }).unknown(true),
    },
  },
  async handler(req, res) {
    try {
      const subscription = await req.server.app.models.Subscription.create({
        user: req.auth.credentials.id,
        endpoint: req.payload.endpoint,
        keys: req.payload.keys,
      })

      res.mongodb(subscription)
    } catch (e) {
      res(Boom.wrap(e))
    }
  },
}
