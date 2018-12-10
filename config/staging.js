function reportingFactory(path, options) {
  return [{
    module: 'good-squeeze',
    name: 'Squeeze',
    args: [options],
  }, {
    module: 'good-squeeze',
    name: 'SafeJson',
  }, {
    module: 'good-file',
    args: [path],
  }]
}

module.exports = {
  host: {
    port: process.env.PORT || 8001,
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
  front: {
    featureFlipping: {
      holidays: true,
      transport: true,
      offlineMode: true,
      pushNotifications: true,
    },
  },
  mailjet: {
    webAppUrl: 'https://cracra-staging.herokuapp.com',
  },
}
