const { version } = require('../package')

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
    lunchesRoles: ['hr', 'board', 'business'],
    partnersRoles: ['hr', 'board'],
  },
  pushNotifications: {
    email: 'mailto:no-reply@link-value.fr',
    privateKey: 'k1LSA-U-MFcGpo6lj-7WGjG5nHrSUencWBk4q4Z1z7k',
  },
  monitoring: {
    token: 'miajoUfOuto0yia1rl4tl2tLefOewriu',
    metricsPath: '/api/metrics',
  },
  front: {
    version,
    autoReconnectTimeout: 1000 * 60,
    autoReconnectRetries: 3,
    featureFlipping: {
      holidays: false,
      transport: false,
      offlineMode: false,
      pushNotifications: false,
    },
    push: {
      publicKey: 'BP60hTFwFmaPMsbx_lQ7loJLWsnyXBIe218Qa46RXtZMhCgicLl6MoTo7idYG35W0jKTF5U7MB6GfI-i_H7-Mjk',
    },
  },
  mailjet: {
    fromEmail: 'no-reply@link-value.fr',
    fromName: 'CraCra',
    toEmail: 'admin@link-value.fr',
    apiKey: process.env.MAILJET_API_KEY,
    apiToken: process.env.MAILJET_API_TOKEN,
    webAppUrl: 'http://localhost:3000',
  },
}
