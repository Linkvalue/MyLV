import React from 'react'
import ReactDOM from 'react-dom'
import moment from 'moment'
import { push } from 'react-router-redux'
import debouce from 'lodash.debounce'

import 'typeface-roboto' // eslint-disable-line import/extensions

import { configureStore, browserHistory } from './store/configure-store'
import Root from './containers/root.container'
import { fetchUserData, loginError } from './modules/auth/auth.actions'
import { lvConnect } from './modules/auth/lvconnect'
import { detectDevice, switchOfflineMode } from './modules/display/display.actions'
import { sentry, version } from './config'
import { installPushNotifications } from './modules/settings/push.service'

if (sentry) {
  window.Raven.config(`https://${sentry.dsn}@sentry.io/${sentry.projectId}`, {
    release: version,
  }).install()
}

const store = configureStore()

lvConnect.on('loginSuccess', async () => {
  const userData = await store.dispatch(fetchUserData())

  if (window.Raven) {
    window.Raven.setUserContext({
      email: userData.email,
      id: userData.id,
    })
  }
  if (window.gtag) {
    window.gtag('set', { user_id: userData.id })
  }

  store.dispatch(push('/'))
})

lvConnect.on('loginError', () => {
  store.dispatch(loginError())
})

moment.locale('fr')

const handleWindowResize = debouce(() => store.dispatch(detectDevice()), 200)
window.addEventListener('resize', handleWindowResize)

// Cleanup old push notification service
if (navigator.serviceWorker) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    registrations.forEach(reg => reg.scope !== `${window.location.origin}/` && reg.unregister())
  })
}

installPushNotifications(store)

window.addEventListener('online', () => store.dispatch(switchOfflineMode(false)))
window.addEventListener('offline', () => store.dispatch(switchOfflineMode(true)))

ReactDOM.render(
  <Root store={store} history={browserHistory} />,
  document.getElementById('mylv'),
)
