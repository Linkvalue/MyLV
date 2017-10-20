const Joi = require('joi')
const moment = require('moment')
const qs = require('qs')
const config = require('config')

const lvConnect = require('../../helpers/lvconnect.helper')
const hasRole = require('../../helpers/hasRole.pre')

const compensatedMealLabels = ['Production', 'Conferences']

module.exports = {
  method: 'GET',
  path: '/api/partners',
  config: {
    validate: {
      query: {
        page: Joi.number().min(1),
        limit: Joi.number().min(1).max(100),
        search: Joi.string().max(30)
      }
    },
    pre: [hasRole(config.cracra.partnersRoles)]
  },
  async handler (request, reply) {
    const query = qs.stringify(request.query)

    const res = await lvConnect.api(`/users?${query}`)
    const data = await res.json()
    const [entries, lunches] = await Promise.all([
      request.server.app.models.Entry.find({
        userId: { $in: data.results.map(partner => partner.id) },
        date: { $regex: moment().format('YYYY-MM-') }
      }),
      request.server.app.models.Lunch.find({
        $or: [
          { attendees: request.auth.credentials.id },
          { owner: request.auth.credentials.id }
        ],
        date: { $gt: moment(`${moment().year()}-${moment().month()}`, 'YYYY-MM').toDate() }
      })
    ])

    reply.mongodb(Object.assign({}, data, {
      results: data.results.map(partner => {
        const partnerEntries = entries.filter(entry => entry.userId.toString() === partner.id)
        const mealVouchers = partnerEntries.reduce((nb, entry) =>
          /-am$/.test(entry.date) && compensatedMealLabels.indexOf(entry.label) >= 0 ? nb + 1 : nb, 0)
        return Object.assign({}, partner, {
          mealVouchers: Math.max(mealVouchers - lunches.length, 0),
          entryCounts: partnerEntries.reduce((acc, entry) => Object.assign(acc, {
            [entry.label]: (acc[entry.label] || 0) + 0.5
          }), {}),
          lunchesCount: lunches.length
        })
      })
    }))
  }
}
