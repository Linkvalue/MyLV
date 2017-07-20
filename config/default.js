module.exports = {
  server: {},
  host: {
    port: 8001
  },
  logs: {
    reporters: {
      consoleReporter: [{
        module: 'good-console',
        args: [{ log: '*', response: '*', worker: '*' }]
      }, 'stdout']
    }
  },
  mongodb: {
    host: 'localhost',
    port: 27017,
    database: 'cracra',
    config: {
      useMongoClient: true
    }
  },
  lvconnect: {
    endpoint: 'https://lvconnect.link-value.fr'
  }
}
