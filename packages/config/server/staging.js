const reportingFactory = require('./helpers/reporting')

module.exports = {
  generateDocumentation: true,
  host: {
    port: process.env.PORT || 8001,
    forceHttps: true,
  },
  logs: {
    reporters: {
      accessReporting: reportingFactory('./logs/hapi/hapi-out.log', { log: '*', response: '*' }),
      errorReporting: reportingFactory('./logs/hapi/hapi-error.log', { error: '*' }),
      workerReporting: reportingFactory('./logs/hapi/hapi-worker.log', { worker: '*' }),
    },
  },
  mongodb: {
    uri: process.env.MONGODB_URI,
  },
  mailjet: {
    webAppUrl: 'https://cracra-staging.herokuapp.com',
  },
}
