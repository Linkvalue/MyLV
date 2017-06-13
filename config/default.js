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
  lvconnect: {
    endpoint: 'https://lvconnect.link-value.fr'
  }
}
