import LVConnectSDK from 'sdk-lvconnect'

export const cracraEndpoint = `${window.location.protocol}//${window.location.host}`

export const lvConnect = new LVConnectSDK({
  mode: 'proxy',
  appId: process.env.appId,
  redirectUri: `${cracraEndpoint}/auth`,
  tokenEndpoint: '/api/auth'
})
