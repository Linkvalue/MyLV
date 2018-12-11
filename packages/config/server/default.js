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
    appSecret: process.env.LVCONNECT_APP_SECRET,
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
  mailjet: {
    fromEmail: 'no-reply@link-value.fr',
    fromName: 'MyLV',
    toEmail: 'admin@link-value.fr',
    apiKey: process.env.MAILJET_API_KEY,
    apiToken: process.env.MAILJET_API_TOKEN,
    webAppUrl: 'http://localhost:3000',
    send: true,
    preview: false,
  },
  cron: {
    notifyIncompleteWorklog: '00 00 10 20-30 * 1-5',
    notifyMissingProofOfTransports: '00 00 10 20-30 * 1-5',
  },
}
