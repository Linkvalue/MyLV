const Joi = require('joi')
const Boom = require('boom')
const path = require('path')
const LVConnectSDK = require('sdk-lvconnect')
const { lvconnect: { appId, appSecret } } = require('config')

const lvConnect = new LVConnectSDK({
  mode: 'private',
  appId,
  appSecret
})

module.exports = [{
  method: 'POST',
  path: '/api/auth',
  config: {
    validate: {
      payload: Joi.object({
        grant_type: Joi.string().valid(['refresh_token', 'authorization_code']).required(),
        refresh_token: Joi.alternatives().when('grant_type', { is: 'refresh_token', then: Joi.string().required() }),
        code: Joi.alternatives().when('grant_type', { is: 'authorization_code', then: Joi.string().required() }),
        redirect_uri: Joi.alternatives().when('grant_type', {
          is: 'authorization_code',
          then: Joi.string().required()
        })
      })
    }
  },
  handler (req, res) {
    lvConnect.proxy(req.payload)
      .then((response) => res(response))
      .catch((err) => err.statusCode ? res(err).code(err.statusCode) : res(Boom.wrap(err)))
  }
}, {
  method: 'GET',
  path: '/api/me',
  handler (req, res) {
    lvConnect.getUserProfile()
      .then((response) => res(response).code(response.statusCode || 200))
      .catch((err) => res(err).code(err.statusCode))
  }
}, {
  method: 'GET',
  path: '/mdl/{path*}',
  handler: {
    directory: {
      path: 'node_modules/material-design-lite/dist',
      index: true
    }
  }
}, {
  method: 'GET',
  path: '/{path*}',
  handler (req, res) {
    if (!path.extname(req.params.path)) {
      return res.file('dist/index.html')
    }

    return res.file(path.join('dist', req.params.path))
  }
}]
