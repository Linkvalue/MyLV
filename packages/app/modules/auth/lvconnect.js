import LVConnectSDK from 'sdk-lvconnect'
import config from '@cracra/config/app'

export const cracraEndpoint = `${window.location.protocol}//${window.location.host}`

if (typeof config.lvconnect.endpoint !== 'undefined' && config.lvconnect.endpoint) {
  LVConnectSDK.overrideLVConnectEndpoint(config.lvconnect.endpoint)
}

export const lvConnect = new LVConnectSDK({
  mode: 'proxy',
  appId: config.lvconnect.appId,
  redirectUri: `${cracraEndpoint}/auth`,
  tokenEndpoint: '/api/auth',
})
