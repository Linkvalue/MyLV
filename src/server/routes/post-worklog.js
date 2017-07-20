const Joi = require('joi')
const Boom = require('boom')
const moment = require('moment')

module.exports = {
  method: 'POST',
  path: '/api/worklog',
  config: {
    validate: {
      payload: Joi.array().items(Joi.object().keys({
        date: Joi.string().regex(/^\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])-(am|pm)$/).required(),
        client: Joi.string(),
        label: Joi.string().required()
      }))
    }
  },
  handler (req, res) {
    let isOutOfBounds
    req.payload.forEach(({ date }) => {
      const diff = moment.duration(moment(date.slice(0, -3)).diff(moment())).asMonths()
      if (Math.abs(diff) > 2) {
        isOutOfBounds = true
      }
    })

    if (isOutOfBounds) {
      res(Boom.badRequest('One or more entries have dates farther than to months from now'))
    }

    const entries = req.payload.map(entry => Object.assign(entry, { userId: req.auth.credentials.id }))
    req.server.app.models.Entry.create(entries)
      .then(() => {
        res({ success: true })
      })
      .catch(err => res(Boom.wrap(err)))
  }
}
