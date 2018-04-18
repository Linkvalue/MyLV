const Glue = require('glue')
const config = require('config')
const webPush = require('web-push')

const routes = require('./routes/routes')
const lvConnect = require('./helpers/lvconnect.helper')
const Client = require('./models/client.model')
const Entry = require('./models/entry.model')
const Holiday = require('./models/holiday.model')
const Manager = require('./models/manager.model')
const Lunch = require('./models/lunch.model')
const ProofOfTransport = require('./models/proofOfTransport.model')
const Subscription = require('./models/subscription.model')
const Profile = require('./models/profile.model')

const manifest = {
  registrations: [
    {
      plugin: {
        register: 'good',
        options: config.logs,
      },
    },
    {
      plugin: 'hapi-auth-bearer-token',
    },
    {
      plugin: {
        register: './plugins/mongodb.plugin',
        options: config.mongodb,
      },
    },
    {
      plugin: 'inert',
    },
    {
      plugin: {
        register: './plugins/mail/mail.plugin',
        options: config.mailjet,
      },
    },
    {
      plugin: {
        register: './plugins/monitoring.plugin',
        options: config.monitoring,
      },
    },
    {
      plugin: './plugins/worklog.plugin',
    },
  ],
  connections: [{
    host: config.host.hostname,
    port: config.host.port,
  }],
}

const shittyLabels = new Map(Object.entries({
  Production: 'production',
  Contribution: 'contribution',
  Conferences: 'conferences',
  'Conges payes': 'paidHolidays',
  'Conges sans solde': 'unpaidHolidays',
  'Absences Syntec': 'conventionalHolidays',
}))

function createServer() {
  return Glue.compose(manifest, {
    relativeTo: __dirname,
  })
}

module.exports = createServer

if (require.main === module) {
  createServer()
    .then(server => server.start().then(() => server))
    .then((server) => {
      server.log('info', `Server started on port ${server.connections[0].info.uri}`)

      webPush.setVapidDetails(
        config.pushNotifications.email,
        config.front.push.publicKey,
        config.pushNotifications.privateKey,
      )

      server.method('sendPushNotification', async (user, data) => {
        try {
          const subscriptions = await Subscription.find({ user: { $in: Array.isArray(user) ? user : [user] } })

          return Promise.all(subscriptions.map(async (subscription) => {
            try {
              await webPush.sendNotification(subscription, data)
            } catch (e) {
              if (e.statusCode === 410) {
                await subscription.remove()
              } else {
                throw e
              }
            }
          }))
        } catch (e) {
          throw e
        }
      })

      server.auth.strategy('bearer', 'bearer-access-token', {
        validateFunc(token, callback) {
          lvConnect
            .setAccessToken(token)
            .getUserProfile()
            .then(user => callback(null, true, user, { token }))
            .catch(err => callback(err, false))
        },
      })

      server.auth.default('bearer')

      server.route(routes)

      server.ext({
        type: 'onRequest',
        method(req, res) {
          if (req.headers['x-forwarded-proto'] !== 'https' && process.env.NODE_ENV !== 'dev') {
            return res.redirect(`https://${req.info.host}${req.path}`)
          }
          return res.continue()
        },
      })

      server.on('tail', () => lvConnect.logout())

      server.app.models = {
        Client,
        Entry,
        Manager,
        Lunch,
        ProofOfTransport,
        Subscription,
        Profile,
        Holiday,
      }

      // TODO: Remove this after next production push
      Array.from(shittyLabels.entries()).forEach(([shitty, clean]) =>
        Entry.updateMany({ label: shitty }, { $set: { label: clean } }).exec())

      // Handle uncaught promise rejections
      process.on('unhandledRejection', (reason) => {
        server.log('error', `Unhandled rejection: ${reason.stack}`)
      })
    })
    .catch((err) => {
      console.error(err.stack) // eslint-disable-line no-console
      process.exit(1)
    })
}
