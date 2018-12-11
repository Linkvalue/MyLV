const Joi = require('joi')
const moment = require('moment')
const qs = require('qs')
const config = require('@cracra/config/server')

const hasRole = require('../../helpers/hasRole.pre')
const getWorkingDays = require('../../helpers/getWorkingDays.helper')

const compensatedMealLabels = ['Production', 'Conferences']

function getLunchesForPartner(lunches, partner) {
  return lunches.filter(lunch =>
    lunch.owner.toString() === partner.id || lunch.attendees.some(attendeeId => attendeeId.toString() === partner.id))
}

module.exports = {
  method: 'GET',
  path: '/api/partners',
  config: {
    validate: {
      query: {
        page: Joi.number().min(1),
        limit: Joi.number().min(1).max(100),
        search: Joi.string().max(30),
        date: Joi.string().regex(/^\d{4}-\d{2}/),
      },
    },
    pre: [hasRole(config.cracra.partnersRoles)],
  },
  async handler(request, reply) {
    const query = qs.stringify(request.query)
    const date = request.query.date || moment().format('YYYY-MM')

    const res = await request.app.lvConnect.api(`/users?${query}`)
    const data = await res.json()
    const [entries, lunches] = await Promise.all([
      request.server.app.models.Entry.find({
        userId: { $in: data.results.map(partner => partner.id) },
        date: { $regex: date },
      }),
      request.server.app.models.Lunch.find({
        date: { $gt: moment(date, 'YYYY-MM').toDate() },
      }),
    ])

    const expectedDays = getWorkingDays(date)

    reply.mongodb(Object.assign({}, data, {
      results: data.results.map((partner) => {
        const partnerEntries = entries.filter(entry => entry.userId.toString() === partner.id)
        const mealVouchers = partnerEntries.reduce((nb, entry) =>
          (/-am$/.test(entry.date) && compensatedMealLabels.indexOf(entry.label) >= 0 ? nb + 1 : nb), 0)
        const lunchesCount = getLunchesForPartner(lunches, partner).length
        return Object.assign({}, partner, {
          mealVouchers: Math.max(mealVouchers - lunchesCount, 0),
          entryCounts: partnerEntries.reduce((acc, entry) => Object.assign(acc, {
            [entry.label]: (acc[entry.label] || 0) + 0.5,
          }), {}),
          lunchesCount,
          isWorklogComplete: partnerEntries.length / 2 >= expectedDays,
        })
      }),
    }))
  },
}
