const config = require('@cracra/config/server')
const Joi = require('joi')

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
    const { Holiday } = req.server.app.models

    const holidaysQueryPromise = Holiday
      .find()
      .sort('-date')
      .limit(limit)
      .skip(limit * (page - 1))
      .exec()
    const [holidays, resultsCount] = await Promise.all([holidaysQueryPromise, Holiday.count()])

    const partnerIds = Array.from(new Set(holidays.map(holiday => holiday.user.toString())).values())
    const response = await req.app.lvConnect
      .api(`/users?limit=${partnerIds.length}&${partnerIds.map(id => `ids=${id}`).join('&')}`)
    const { results } = await response.json()

    res.mongodb({
      limit,
      page,
      pageCount: Math.ceil(resultsCount / limit),
      results: holidays.map(holiday => ({
        ...holiday.toJSON(),
        user: results.find(partner => partner.id === holiday.user.toString()),
      })),
    })
  },
}
