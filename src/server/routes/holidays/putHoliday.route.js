const Joi = require('joi')
const { holidayLabels } = require('../../../shared/calendar.constants')

module.exports = {
  method: 'PUT',
  path: '/api/holidays/{id}',
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
    const holiday = await req.server.app.models.Holiday.findOneAndUpdate({ _id: req.params.id }, { $set: req.payload })

    res.mongodb(holiday)
  },
}
