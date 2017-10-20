const Joi = require('joi')
const Boom = require('boom')
const config = require('config')

const hasRole = require('../../helpers/hasRole.pre')

module.exports = {
  method: 'GET',
  path: '/api/lunches',
  config: {
    validate: {
      query: {
        limit: Joi.number().min(1).max(100),
        page: Joi.number().min(1)
      }
    },
    pre: [hasRole(config.cracra.lunchesRoles)]
  },
  handler (req, res) {
    const limit = req.query.limit || 20
    const page = req.query.page - 1 || 0

    const resultPromise = req.server.app.models.Lunch.find()
      .where({ owner: req.auth.credentials.id })
      .limit(limit)
      .skip(page * limit || 0)
      .exec()

    const countPromise = req.server.app.models.Lunch.count()
      .where({ owner: req.auth.credentials.id })

    Promise.all([resultPromise, countPromise])
      .then(([lunches, count]) => res.mongodb({
        results: lunches,
        page: page + 1,
        pageCount: Math.ceil(count / limit),
        limit
      }, ['owner']))
      .catch(err => res(Boom.wrap(err)))
  }
}
