import React from 'react'
import ReactDOM from 'react-dom'
import moment from 'moment'
import { push } from 'react-router-redux'

import './index.scss'
import { configureStore } from './app/store/configure-store'
import { Root } from './app/containers/root'
import { fetchUserData, loginError } from './app/modules/auth/auth-actions'
import { lvConnect } from './app/modules/auth/lvconnect'
// import { registerWorker } from './service-worker/register-worker'

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

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('cracra')
)
