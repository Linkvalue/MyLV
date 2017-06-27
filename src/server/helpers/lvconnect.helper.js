const LVConnectSDK = require('sdk-lvconnect')
const { lvconnect: { appId, appSecret } } = require('config')

module.exports = new LVConnectSDK({
  mode: 'private',
  appId,
  appSecret
})
