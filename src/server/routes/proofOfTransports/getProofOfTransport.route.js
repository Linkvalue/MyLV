const config = require('config')
const Joi = require('joi')

const lvConnect = require('../../helpers/lvconnect.helper')
const hasRole = require('../../helpers/hasRole.pre')

module.exports = {
  method: 'GET',
  path: '/api/proofOfTransport',
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
    const { ProofOfTransport } = req.server.app.models

    const proofsQueryPromise = ProofOfTransport
      .find()
      .limit(limit)
      .skip(limit * (page - 1))
      .exec()
    const [proofs, resultsCount] = await Promise.all([proofsQueryPromise, ProofOfTransport.count()])

    const partnerIds = Array.from(new Set(proofs.map(proof => proof.user.toString())).values())
    const response = await lvConnect.api(`/users?${partnerIds.map(id => `ids=${id}`).join('&')}`)
    const { results } = await response.json()

    res.mongodb({
      limit,
      page,
      pageCount: Math.ceil(resultsCount / limit),
      results: proofs.map(proof => ({
        ...proof.toJSON(),
        user: results.find(partner => partner.id === proof.user.toString()),
      })),
    })
  },
}
