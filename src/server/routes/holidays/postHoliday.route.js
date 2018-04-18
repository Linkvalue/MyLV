const Joi = require('joi')
const moment = require('moment')
const { holidayLabels } = require('../../../shared/calendar.constants')

module.exports = {
  method: 'POST',
  path: '/api/holidays',
  config: {
    validate: {
      payload: {
        title: Joi.string().max(255).required(),
        comment: Joi.string().max(255),
        periods: Joi.array().items(Joi.object({
          label: Joi.string().valid(Array.from(holidayLabels.keys())).required(),
          startDate: Joi.date().required(),
          endDate: Joi.date().required(),
        })).required(),
      },
    },
  },
  async handler(req, res) {
    const holiday = await req.server.app.models.Holiday.create(Object.assign(req.payload, {
      user: req.auth.credentials.id,
      date: moment().toDate(),
    }))

    req.server.plugins.mailjet.sendHolidaysRequest(req.auth.credentials, holiday)

    res.mongodb(holiday)
  },
}
