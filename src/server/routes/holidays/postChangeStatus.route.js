const Joi = require('joi')
const config = require('config')

const hasRole = require('../../helpers/hasRole.pre')

const statusMapping = {
  approved: 'acceptée',
  rejected: 'refusée',
}

module.exports = {
  method: 'POST',
  path: '/api/holidays/{id}/changeStatus',
  config: {
    validate: {
      payload: {
        status: Joi.string().valid(['approved', 'rejected']).required(),
      },
    },
    pre: [hasRole(config.cracra.partnersRoles)],
  },
  async handler(req, res) {
    const { status } = req.payload
    const holidayRequest = await req.server.app.models.Holiday.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { status } },
    )

    req.server.methods.sendPushNotification(holidayRequest.user, JSON.stringify({
      message: `Demande de congé "${holidayRequest.title}" ${statusMapping[status]}`,
      url: `/holidays/${holidayRequest._id}`,
    }))

    res.mongodb({ ...holidayRequest.toJSON(), status })
  },
}
