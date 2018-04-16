const path = require('path')
const Email = require('email-templates')
const { front, host } = require('config')

exports.register = async (server, options, next) => {
  const emailEngine = new Email({
    views: {
      root: path.resolve(__dirname, 'templates/'),
      locals: {
        cracraEndpoint: front.url || `https://${host.hostname}${host.port ? `:${host.port}` : ''}`,
      },
    },
    juice: true,
    juiceResources: {
      webResources: {
        relativeTo: path.resolve(__dirname, 'assets/'),
      },
    },
    message: {
      from: `"${options.fromName}" ${options.fromEmail}`,
    },
    send: true,
    preview: process.env.NODE_ENV === 'dev',
    transport: {
      service: 'Mailjet',
      auth: {
        user: options.apiKey,
        pass: options.apiToken,
      },
    },
  })

  server.event('email-sent')

  const sendEmail = (emailOptions) => {
    server.events.emit('email-sent', emailOptions.template)
    emailEngine.send(emailOptions)
  }

  server.expose('sendHolidaysRequest', (user, holidayRequest) => sendEmail({
    template: 'holidaysRequest',
    message: {
      to: options.toEmail,
    },
    locals: {
      user,
      holidayRequest,
    },
  }))

  if (process.env.NODE_ENV === 'dev') {
    server.route([{
      method: 'POST',
      path: '/api/emails/send',
      config: { auth: false },
      async handler(req, res) {
        await req.server.plugins.mailjet[req.query.method](...req.payload)
        res({ success: true })
      },
    }, {
      method: 'GET',
      path: '/api/emails/render',
      config: { auth: false },
      async handler(req, res) {
        const html = await emailEngine.render(`${req.query.template}/html`, {
          user: {},
          holidayRequest: {},
          cracraEndpoint: 'http://localhost:3000',
        })
        res(html)
      },
    }])
  }

  next()
}

exports.register.attributes = {
  name: 'mailjet',
  version: '0.0.2',
}
