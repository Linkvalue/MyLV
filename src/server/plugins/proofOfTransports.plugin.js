const lvConnect = require('../helpers/lvconnect.helper')

exports.register = (server, options, next) => {
  server.expose('notifyMissingProofOfTransports', async () => {
    const proofOfTransports = await server.app.models.ProofOfTransport.find({
      startingDate: { $lte: new Date() },
      expirationDate: { $gte: new Date() },
    })

    const partners = proofOfTransports.map(proofOfTransport => proofOfTransport.user)

    const badBoys = await server.app.models.Profile.find({ userId: { $nin: partners } })
    const badBoysQuery = badBoys.map(profile => `ids=${profile.userId.toString()}`)
    const { results: realBadBoys } = await lvConnect.api(`/users?${badBoysQuery.join('&')}`).then(res => res.json())

    await server.methods.sendPushNotification(realBadBoys.map(partner => partner.id), JSON.stringify({
      message: 'Justificatif de titre de transport à envoyer !',
    }))
  })

  server.expose('getLatestProofOfTransport', user => server.app.models.ProofOfTransport
    .findOne({ user })
    .sort({ expirationDate: -1 }))

  next()
}

exports.register.attributes = {
  name: 'proofOfTransports',
  version: '0.0.1',
}
