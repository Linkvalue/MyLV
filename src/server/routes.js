const Joi = require('joi')
const Boom = require('boom')
const fetch = require('node-fetch')
const path = require('path')
const { lvconnect: { appId, appSecret, endpoint } } = require('config')

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
    fetch(`${endpoint}/oauth/token`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${new Buffer(`${appId}:${appSecret}`).toString('base64')}`
      },
      body: JSON.stringify(req.payload)
    })
      .then(response => response.json())
      .then((response) => res(response).code(response.statusCode || 200))
      .catch((err) => res(Boom.wrap(err)))
  }
}, {
  method: 'GET',
  path: '/api/me',
  handler (req, res) {
    fetch(`${endpoint}/users/me`, {
      method: 'GET',
      headers: {
        Authorization: req.headers.authorization
      }
    })
      .then(response => response.json())
      .then((response) => res(response).code(response.statusCode || 200))
      .catch((err) => res(Boom.wrap(err)))
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
