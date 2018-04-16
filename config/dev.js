module.exports = {
  host: {
    hostname: 'localhost',
  },
  front: {
    url: 'http://localhost:3000',
    featureFlipping: {
      holidays: true,
      transport: true,
      offlineMode: true,
      pushNotifications: true,
    },
  },
}
