const LVConnectSDK = require('sdk-lvconnect')
const { lvconnect: { appId, appSecret, endpoint } } = require('config')

if (endpoint) {
  LVConnectSDK.overrideLVConnectEndpoint(endpoint)
}

const lvConnect = new LVConnectSDK({
  mode: 'private',
  appId,
  appSecret
})

module.exports = lvConnect
