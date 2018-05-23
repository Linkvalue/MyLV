const config = require('config')
const moment = require('moment')

const hasRole = require('../../helpers/hasRole.pre')
const getWorkingDays = require('../../helpers/getWorkingDays.helper')
const lvConnect = require('../../helpers/lvconnect.helper')

module.exports = {
  method: 'POST',
  path: '/api/worklog/notify',
  config: {
    pre: [hasRole(config.cracra.partnersRoles)],
  },
  async handler(req, res) {
    const date = moment().format('YYYY-MM')
    const entries = await req.server.app.models.Entry.find({
      date: { $regex: date },
    })

    const expectedDays = getWorkingDays(date)
    const partners = new Map()
    entries.forEach(entry => partners.set(entry.userId.toString(), (partners.get(entry.userId.toString()) || 0) + 1))
    const filled = Array.from(partners.entries())
      .filter(([, count]) => count / 2 >= expectedDays)
      .map(([userId]) => userId)

    const badBoys = await req.server.app.models.Profile.find({ userId: { $nin: filled } })
    const badBoysQuery = badBoys.map(profile => `ids=${profile.userId.toString()}`)
    const { results: reelBadBoys } = await lvConnect.api(`/users?${badBoysQuery.join('&')}`).then(res => res.json())

    await req.server.methods.sendPushNotification(reelBadBoys.map(partner => partner.id), JSON.stringify({
      message: 'CRA CRA CRA CRA !',
    }))

    res({ notified: badBoys.length })
  },
}
