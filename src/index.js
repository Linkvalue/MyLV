import React from 'react'
import ReactDOM from 'react-dom'
import moment from 'moment'
import { push } from 'react-router-redux'

import './index.scss'
import { configureStore } from './app/store/configure-store'
import { Root } from './app/containers/root'
import { receiveAuthTokens, fetchUserData } from './app/modules/auth/auth-actions'
// import { registerWorker } from './service-worker/register-worker'

// registerWorker()
const store = configureStore()

window.loginDone = (authData) => {
  store.dispatch(receiveAuthTokens(authData))
  store.dispatch(fetchUserData())
    .then(() => store.dispatch(push('/')))
}

moment.locale('fr')

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('cracra')
)
