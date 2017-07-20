import LVConnectSDK from 'sdk-lvconnect'

export const cracraEndpoint = `${window.location.protocol}//${window.location.host}`

if (typeof process.env.LVCONNECT_ENDPOINT !== 'undefined' && process.env.LVCONNECT_ENDPOINT) {
  LVConnectSDK.overrideLVConnectEndpoint(process.env.LVCONNECT_ENDPOINT)
}

export const lvConnect = new LVConnectSDK({
  mode: 'proxy',
  appId: process.env.APP_ID,
  redirectUri: `${cracraEndpoint}/auth`,
  tokenEndpoint: '/api/auth'
})
