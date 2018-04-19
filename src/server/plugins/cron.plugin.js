const { CronJob } = require('cron')

const lvConnect = require('../helpers/lvconnect.helper')

exports.register = (server, options, next) => {
  const jobs = {
    notifyIncompleteWorklog: {
      cronTime: options.notifyIncompleteWorklog,
      onTick: async () => {
        await lvConnect.fetchTokensFromClientCredentials()
        await server.plugins.worklog.notifityIncompleteWorklog()
        lvConnect.logout()
        throw new Error('Foo')
      },
    },
  }

  server.event('cron-tick')
  server.event('cron-error')

  Object.entries(jobs).forEach(([name, cron]) => new CronJob({
    ...cron,
    async onTick() {
      try {
        server.log('info', `cron "${name}" tick`)
        server.emit('cron-tick', { name })
        await cron.onTick()
      } catch (e) {
        server.log('error', `cron "${name}" failed with error:\n${e.stack}`)
        server.emit('cron-error', { name })
      }
    },
    start: true,
  }))

  next()
}

exports.register.attributes = {
  name: 'cron',
  version: '0.0.1',
}
