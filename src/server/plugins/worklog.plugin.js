exports.register = (server, options, next) => {
  server.expose('saveEntries', async (entries, userId) => {
    console.log(userId)
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

  next()
}

exports.register.attributes = {
  name: 'worklog',
  version: '0.0.1',
}
