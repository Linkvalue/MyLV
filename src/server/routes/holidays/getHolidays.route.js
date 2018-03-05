const config = require('config')
const Joi = require('joi')

const lvConnect = require('../../helpers/lvconnect.helper')
const hasRole = require('../../helpers/hasRole.pre')

module.exports = {
  method: 'GET',
  path: '/api/holidays',
  config: {
    validate: {
      query: {
        page: Joi.number().min(1),
        limit: Joi.number().min(1).max(100),
        search: Joi.string().max(30),
      },
    },
    pre: [hasRole(config.cracra.partnersRoles)],
  },
  async handler(req, res) {
    const { page = 1, limit = 25 } = req.query
    const holidays = await req.server.app.models.Holiday
      .find()
      .sort('-date')
      .limit(limit)
      .skip(limit * (page - 1))
      .exec()

    const partnerIds = Array.from(new Set(holidays.map(holiday => holiday.user.toString())).values())
    const response = await lvConnect.api(`/users?${partnerIds.map(id => `ids=${id}`).join('&')}`)
    const { results } = await response.json()

    res.mongodb({
      results: holidays.map(holiday => ({
        ...holiday.toJSON(),
        partner: results.find(partner => partner.id === holiday.user.toString()),
      })),
    })
  },
}
