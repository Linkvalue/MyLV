import React from 'react'
import ReactDOM from 'react-dom'
import moment from 'moment'
import { push } from 'react-router-redux'
import debouce from 'lodash.debounce'

import { configureStore, browserHistory } from './store/configure-store'
import Root from './containers/root.container'
import { fetchUserData, loginError } from './modules/auth/auth.actions'
import { lvConnect } from './modules/auth/lvconnect'
import { registerWorker } from './service-worker/register-worker'
import { detectDevice } from './modules/display/display.actions'

// Import PWA manifest with file-loader
import './manifest.json'

// registerWorker()
const store = configureStore()

lvConnect.on('loginSuccess', () => {
  store.dispatch(fetchUserData())
    .then(() => store.dispatch(push('/')))
})

lvConnect.on('loginError', () => {
  store.dispatch(loginError())
})

moment.locale('fr')

const handleWindowResize = debouce(() => store.dispatch(detectDevice()), 200)
window.addEventListener('resize', handleWindowResize)

if (process.env.NODE_ENV !== 'dev') {
  registerWorker()
}

ReactDOM.render(
  <Root store={store} history={browserHistory} />,
  document.getElementById('cracra'),
)
