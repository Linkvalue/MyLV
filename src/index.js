import React from 'react'
import ReactDOM from 'react-dom'
import moment from 'moment'
import { push } from 'react-router-redux'
import debouce from 'lodash.debounce'

import { configureStore, browserHistory } from './app/store/configure-store'
import { Root } from './app/containers/root.container'
import { fetchUserData, loginError } from './app/modules/auth/auth.actions'
import { lvConnect } from './app/modules/auth/lvconnect'
import { registerWorker } from './app/service-worker/register-worker'
import { detectDevice } from './app/modules/display/display.actions'

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
  document.getElementById('cracra')
)
