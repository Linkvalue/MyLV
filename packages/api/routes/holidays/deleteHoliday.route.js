const Boom = require('boom')
const config = require('@cracra/config/server')

module.exports = {
  method: 'DELETE',
  path: '/api/holidays/{id}',
  async handler(req, res) {
    const holiday = await req.server.app.models.Holiday.findById(req.params.id)

    const hasPermissions = config.cracra.partnersRoles.some(role => req.auth.credentials.roles.indexOf(role) >= 0)
    if (holiday.user.toString() !== req.auth.credentials.id && !hasPermissions) {
      return res(Boom.forbidden('You don\'t have the rights to delete others holidays'))
    }

    await holiday.remove()
    return res({ success: true })
  },
}
