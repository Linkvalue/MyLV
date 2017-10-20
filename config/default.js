module.exports = {
  server: {},
  host: {
    hostname: null,
    port: 8001,
  },
  logs: {
    reporters: {
      consoleReporter: [{
        module: 'good-console',
        args: [{ log: '*', response: '*', worker: '*' }],
      }, 'stdout'],
    },
  },
  mongodb: {
    host: 'localhost',
    port: 27017,
    database: 'cracra',
    config: {
      useMongoClient: true,
    },
  },
  lvconnect: {
    appId: null,
    appSecret: null,
    endpoint: 'https://lvconnect.link-value.fr',
  },
  cracra: {
    lunchesRoles: ['rh', 'board', 'business'],
    partnersRoles: ['rh', 'board'],
  },
}
