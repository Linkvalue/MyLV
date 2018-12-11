const LVConnectSDK = require('sdk-lvconnect')
const { lvconnect: { appId, appSecret, endpoint } } = require('@cracra/config/server')

if (endpoint) {
  LVConnectSDK.overrideLVConnectEndpoint(endpoint)
}

module.exports = () => new LVConnectSDK({
  mode: 'private',
  appId,
  appSecret,
})
