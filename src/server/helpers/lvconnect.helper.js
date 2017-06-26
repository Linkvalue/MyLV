const LVConnectSDK = require('sdk-lvconnect')
const { lvconnect: { appId, appSecret } } = require('config')

LVConnectSDK.overrideLVConnectEndpoint('http://localhost:8000')

module.exports = new LVConnectSDK({
  mode: 'private',
  appId,
  appSecret
})
