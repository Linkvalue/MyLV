const Joi = require('joi')
const Boom = require('boom')
const { cracra } = require('@cracra/config/server')

module.exports = {
  method: 'GET',
  path: '/api/worklog/{id}',
  config: {
    validate: {
      query: {
        year: Joi.string().required(),
        month: Joi.string().required(),
      },
    },
  },
  async handler(req, res) {
    const { Entry } = req.server.app.models

    const canViewOthersWorklogs = cracra.partnersRoles.some(role => req.auth.credentials.roles.indexOf(role) >= 0)
    if (req.params.id !== req.auth.credentials.id && !canViewOthersWorklogs) {
      return res(Boom.forbidden('Insufficient rights.'))
    }

    let partner
    if (req.params.id) {
      const response = await req.app.lvConnect.api(`/users/${req.params.id}`)
      partner = await response.json()
    } else {
      partner = req.auth.credentials
    }

    const results = await Entry.find({
      userId: req.params.id || req.auth.credentials.id,
      date: { $regex: `${req.query.year}-${req.query.month}-` },
    })

    res.mongodb({ results, partner }, ['client', 'manager', 'id', 'userId'])
  },
}
