const Joi = require('joi')
const Boom = require('boom')

module.exports = {
  method: 'GET',
  path: '/api/worklog',
  config: {
    validate: {
      query: {
        year: Joi.string().required(),
        month: Joi.string().required(),
      },
    },
  },
  handler (req, res) {
    const { Entry } = req.server.app.models

    return Entry.find({
      userId: req.auth.credentials.id,
      date: { $regex: `${req.query.year}-${req.query.month}-` },
    })
      .then(entries => res.mongodb(entries, ['client', 'manager', 'id', 'userId']))
      .catch(err => res(Boom.wrap(err)))
  },
}
