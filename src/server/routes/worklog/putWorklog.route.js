const Joi = require('joi')
const Boom = require('boom')
const moment = require('moment')

module.exports = {
  method: 'PUT',
  path: '/api/worklog',
  config: {
    validate: {
      payload: Joi.array().items(Joi.object().keys({
        date: Joi.string().regex(/^\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])-(am|pm)$/).required(),
        client: Joi.string(),
        manager: Joi.string(),
        label: Joi.alternatives().try(Joi.any().allow(null), Joi.string()),
      })),
    },
  },
  handler (req, res) {
    let isOutOfBounds
    let missingClientOrManager
    req.payload.forEach(({ date, client, manager }) => {
      const diff = moment.duration(moment(date.slice(0, -3)).diff(moment())).asMonths()
      if (Math.abs(diff) > 2) {
        isOutOfBounds = true
      }

      if ((client && !manager) || (!client && manager)) {
        missingClientOrManager = true
      }
    })

    if (isOutOfBounds) {
      return res(Boom.badRequest('One or more entries have dates farther than to months from now'))
    }

    if (missingClientOrManager) {
      return res(Boom.badRequest('One or more entries have specified a client without a manager'))
    }

    const entriesToAdd = req.payload
      .map(entry => Object.assign(entry, { userId: req.auth.credentials.id }))
      .filter(entry => !!entry.label)

    return req.server.app.models.Entry.deleteMany({
      userId: req.auth.credentials.id,
      date: { $in: req.payload.map(entry => entry.date) },
    })
      .then(() => {
        if (entriesToAdd.length > 0) {
          return req.server.app.models.Entry.create(entriesToAdd)
        }
      })
      .then(() => res({ success: true }))
      .catch(err => res(Boom.wrap(err)))
  },
}
