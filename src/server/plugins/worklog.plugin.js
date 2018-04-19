const moment = require('moment')

const getWorkingDays = require('../helpers/getWorkingDays.helper')
const lvConnect = require('../helpers/lvconnect.helper')

exports.register = (server, options, next) => {
  server.expose('saveEntries', async (entries, userId) => {
    const entriesToAdd = entries
      .map(entry => Object.assign(entry, { userId }))
      .filter(entry => !!entry.label)

    await server.app.models.Entry.deleteMany({
      userId,
      date: { $in: entries.map(entry => entry.date) },
    })

    if (entriesToAdd.length > 0) {
      await server.app.models.Entry.create(entriesToAdd)
    }
  })

  server.expose('notifityIncompleteWorklog', async () => {
    const date = moment().format('YYYY-MM')
    const entries = await server.app.models.Entry.find({
      date: { $regex: date },
    })

    const expectedDays = getWorkingDays(date)
    const partners = new Map()
    entries.forEach(entry => partners.set(entry.userId.toString(), (partners.get(entry.userId.toString()) || 0) + 1))
    const filled = Array.from(partners.entries())
      .filter(([, count]) => count / 2 >= expectedDays)
      .map(([userId]) => userId)

    const badBoys = await server.app.models.Profile.find({ userId: { $nin: filled } })
    const badBoysQuery = badBoys.map(profile => `ids=${profile.userId.toString()}`)
    const { results } = await lvConnect.api(`/users?${badBoysQuery.join('&')}`).then(res => res.json())
    const reelBadBoys = results.filter(partner => partner.roles.includes('tech'))

    await server.methods.sendPushNotification(reelBadBoys.map(partner => partner.id), JSON.stringify({
      message: 'CRA CRA CRA CRA !',
    }))
  })

  next()
}

exports.register.attributes = {
  name: 'worklog',
  version: '0.0.1',
}
