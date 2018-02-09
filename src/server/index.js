const Glue = require('glue')
const config = require('config')

const routes = require('./routes/routes')
const lvConnect = require('./helpers/lvconnect.helper')
const Client = require('./models/client.model')
const Entry = require('./models/entry.model')
const Manager = require('./models/manager.model')
const Lunch = require('./models/lunch.model')
const ProofOfTransport = require('./models/proofOfTransport.model')

const manifest = {
  registrations: [{
    plugin: {
      register: 'good',
      options: config.logs,
    },
  }, {
    plugin: {
      register: './plugins/mongodb.plugin',
      options: config.mongodb,
    },
  }, {
    plugin: 'inert',
  }, {
    plugin: 'hapi-auth-bearer-token',
  }],
  connections: [{
    host: config.host.hostname,
    port: config.host.port,
  }],
}

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
      }

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
