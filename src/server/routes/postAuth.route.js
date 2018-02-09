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
  async handler(req, res) {
    let response
    try {
      response = await lvConnect.proxy(req.payload)
    } catch (err) {
      return err.statusCode ? res(err).code(err.statusCode) : res(Boom.wrap(err))
    }

    const user = await lvConnect
      .setAccessToken(response.access_token)
      .getUserProfile()
    const profile = await req.server.app.models.Profile.findOne({ userId: user.id })

    if (!profile) {
      await req.server.app.models.Profile.create({ userId: user.id })
    }

    res(response)
  },
}
