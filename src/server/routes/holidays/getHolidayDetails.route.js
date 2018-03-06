const Boom = require('boom')
const { cracra } = require('config')

const lvConnect = require('../../helpers/lvconnect.helper')

module.exports = {
  method: 'GET',
  path: '/api/holidays/{id}',
  async handler(req, res) {
    const holidayRequest = await req.server.app.models.Holiday.findById(req.params.id)

    const canViewOthersRequests = cracra.partnersRoles.some(role => req.auth.credentials.roles.indexOf(role) >= 0)
    if (holidayRequest.user.toString() !== req.auth.credentials.id && !canViewOthersRequests) {
      return res(Boom.forbidden('Insufficient rights.'))
    }

    const response = await lvConnect.api(`/users/${holidayRequest.user}`)
    const partner = await response.json()

    if (!holidayRequest) {
      res(Boom.notFound('Holiday request not found.'))
    } else {
      res.mongodb({
        ...holidayRequest.toJSON(),
        user: partner,
      })
    }
  },
}
