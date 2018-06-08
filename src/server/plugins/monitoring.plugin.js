const client = require('prom-client')

const metrics = {
  // This allows to measure request response time repartition by quantiles
  httpRequestDurationMilliseconds: new client.Summary({
    name: 'http_request_duration_milliseconds',
    help: 'Response time in milliseconds by quantiles.',
    labelNames: ['method', 'path', 'status'],
  }),
  // This allows to rank request response time in 3 buckets: 0-500, 500-1500 and 1500-+Inf (used for Apdex)
  httpRequestBucketMilliseconds: new client.Histogram({
    name: 'http_request_bucket_milliseconds',
    help: 'Bucketed response time in milliseconds.',
    buckets: [500, 1500],
    labelNames: ['method', 'path', 'status'],
  }),
  // Total request counter to measure usage of each routes
  httpRequestsTotal: new client.Counter({
    name: 'http_requests_total',
    help: 'Paths taken in the app.',
    labelNames: ['path', 'method'],
  }),
  // Total server error counter (crashes and timeouts)
  httpRequestsErrorTotal: new client.Counter({
    name: 'http_server_error_total',
    help: 'Error codes returned.',
    labelNames: ['path', 'method'],
  }),
  // Total and Type of error counter
  httpRequestsErrorTotalByType: new client.Counter({
    name: 'http_error_by_type',
    help: 'Number of errors by error code',
    labelNames: ['path', 'method', 'code'],
  }),
  emailSentTotal: new client.Counter({
    name: 'email_sent_total',
    help: 'Number of email sent by template.',
    labelNames: ['template'],
  }),
  cronTickTotal: new client.Counter({
    name: 'cron_tick_total',
    help: 'Number of cron tick by name.',
    labelNames: ['name'],
  }),
  cronErrorTotal: new client.Counter({
    name: 'cron_error_total',
    help: 'Number of cron error by name.',
    labelNames: ['name'],
  }),
}

exports.register = (server, options, next) => {
  client.collectDefaultMetrics({ timeout: 5000 })

  server.auth.strategy('metrics', 'bearer-access-token', {
    allowQueryToken: true,
    validateFunc(token, callback) {
      return callback(null, token === options.token, { token })
    },
  })

  server.route({
    method: 'GET',
    path: options.metricsPath,
    config: { auth: 'metrics' },
    handler(req, res) {
      res(client.register.metrics())
        .header('Content-Type', client.register.contentType)
    },
  })

  server.on({ name: 'request-internal', filter: 'received' }, (req) => {
    if (req.route.path !== options.metricsPath && req.route.path.startsWith('/api')) {
      metrics.httpRequestsTotal.inc({ path: req.route.path, method: req.method })
    }
  })

  server.on('response', (req) => {
    const { path } = req.route
    if (path !== options.metricsPath && path.startsWith('/api')) {
      const time = req.info.responded - req.info.received
      metrics.httpRequestDurationMilliseconds.labels(req.method, path, req.response.statusCode).observe(time)
      metrics.httpRequestBucketMilliseconds.labels(req.method, path, req.response.statusCode).observe(time)

      if (req.response.statusCode >= 400) {
        metrics.httpRequestsErrorTotal.inc({ path, method: req.method })
        metrics.httpRequestsErrorTotalByType.inc({ path, method: req.method, code: req.response.statusCode })
      }
    }
  })

  server.on('email-sent', template => metrics.emailSentTotal.inc({ template }))

  server.on('cron-tick', ({ name }) => metrics.cronTickTotal.inc({ name }))
  server.on('cron-error', ({ name }) => metrics.cronErrorTotal.inc({ name }))

  next()
}

exports.register.attributes = {
  name: 'monitoring',
  version: '0.0.1',
}
