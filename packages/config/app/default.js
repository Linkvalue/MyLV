module.exports = {
  version: process.env.APP_VERSION,
  autoReconnectTimeout: 1000 * 60,
  autoReconnectRetries: 3,
  featureFlipping: {
    holidays: true,
    transport: true,
    offlineMode: true,
    pushNotifications: true,
  },
}
