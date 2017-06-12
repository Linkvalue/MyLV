const Glue = require('glue')
const config = require('config')
const routes = require('./src/server/routes')

const manifest = {
  registrations: [{
    plugin: {
      register: 'good',
      options: config.logs
    }
  }, {
    plugin: 'inert'
  }],
  connections: [{
    host: config.host.hostname,
    port: config.host.port
  }]
}

function createServer () {
  return Glue.compose(manifest, {
    relativeTo: __dirname
  })
}

module.exports = createServer

if (require.main === module) {
  createServer()
    .then(server => server.start().then(() => server))
    .then((server) => {
      server.log('info', `Server started on port ${server.connections[0].info.uri}`)

      server.route(routes)

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
