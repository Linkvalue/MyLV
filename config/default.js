module.exports = {
  server: {},
  host: {
    port: 8000
  },
  logs: {
    reporters: {
      consoleReporter: [{
        module: 'good-console',
        args: [{ log: '*', response: '*', worker: '*' }]
      }, 'stdout']
    }
  }
}
