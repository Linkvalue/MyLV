const { version } = require('../package')

const appName = 'MyLV'

module.exports = {
  appName,
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
  docs: {
    documentationPath: '/api/docs',
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
    appId: process.env.LVCONNECT_APP_ID,
    appSecret: process.env.LVCONNECT_APP_SECRET,
    endpoint: 'https://lvconnect.link-value.fr',
  },
  cracra: {
    lunchesRoles: ['hr', 'board', 'business'],
    partnersRoles: ['hr', 'board'],
  },
  pushNotifications: {
    email: 'mailto:no-reply@link-value.fr',
    privateKey: process.env.WEB_PUSH_PRIVATE_KEY,
  },
  monitoring: {
    token: process.env.MONITORING_TOKEN,
    metricsPath: '/api/metrics',
  },
  front: {
    appName,
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
      publicKey: process.env.WEB_PUSH_PUBLIC_KEY,
    },
  },
  mailjet: {
    fromEmail: 'no-reply@link-value.fr',
    fromName: 'MyLV',
    toEmail: 'admin@link-value.fr',
    apiKey: process.env.MAILJET_API_KEY,
    apiToken: process.env.MAILJET_API_TOKEN,
    webAppUrl: 'http://localhost:3000',
  },
  cron: {
    notifyIncompleteWorklog: '00 00 10 20-30 * 1-5',
    notifyMissingProofOfTransports: '00 00 10 20-30 * 1-5',
  },
}
