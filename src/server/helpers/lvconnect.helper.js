const LVConnectSDK = require('sdk-lvconnect')
const { lvconnect: { appId, appSecret, endpoint } } = require('config')

if (endpoint) {
  LVConnectSDK.overrideLVConnectEndpoint(endpoint)
}

module.exports = new LVConnectSDK({
  mode: 'private',
  appId,
  appSecret
})
