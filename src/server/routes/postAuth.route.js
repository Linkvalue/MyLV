const Joi = require('joi')
const Boom = require('boom')

const lvConnect = require('../helpers/lvconnect.helper')

module.exports = {
  method: 'POST',
  path: '/api/auth',
  config: {
    auth: false,
    validate: {
      payload: Joi.object({
        grant_type: Joi.string().valid(['refresh_token', 'authorization_code']).required(),
        refresh_token: Joi.alternatives().when('grant_type', { is: 'refresh_token', then: Joi.string().required() }),
        code: Joi.alternatives().when('grant_type', { is: 'authorization_code', then: Joi.string().required() }),
        redirect_uri: Joi.alternatives().when('grant_type', {
          is: 'authorization_code',
          then: Joi.string().required(),
        }),
      }),
    },
  },
  handler(req, res) {
    return lvConnect.proxy(req.payload)
      .then(response => res(response))
      .catch(err => (err.statusCode ? res(err).code(err.statusCode) : res(Boom.wrap(err))))
  },
}
