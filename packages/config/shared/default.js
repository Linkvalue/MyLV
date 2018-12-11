module.exports = {
  appName: 'MyLV',
  lvconnect: {
    appId: process.env.LVCONNECT_APP_ID,
  },
  pushNotifications: {
    publicKey: process.env.WEB_PUSH_PUBLIC_KEY,
  },
}
