import 'whatwg-fetch'
import LVConnectSDK from 'sdk-lvconnect'
import { push } from 'react-router-redux'

import { cracraEndpoint, lvConnect } from './lvconnect'
import { postTransportProofSuccess } from '../transport/transport.actions'
import { switchOfflineMode, pushAlert } from '../display/display.actions'
import { HEADER_CACHE_FIRST } from './auth.constants'
import { ALERT_ERROR } from '../display/display.constants'

export const LOGIN_ERROR = 'LOGIN_ERROR'
export const loginError = () => (dispatch) => {
  dispatch({ type: LOGIN_ERROR })
  dispatch(pushAlert({ type: ALERT_ERROR, message: 'Erreur lors de la connexion' }))
}

export const loginDone = () => () => LVConnectSDK.handleLoginDone()

class HttpError extends Error {
  constructor(status, message) {
    super(message)
    this.status = status
  }
}

export const LOGOUT = 'LOGOUT'
export const logout = () => (dispatch) => {
  lvConnect.logout()
  window.Raven.setUserContext()

  dispatch(push('/login'))

  return dispatch({
    type: LOGOUT,
  })
}

export const fetchWithAuth = (url, options = {}) => async (dispatch, getState) => {
  const { isOffline } = getState().display

  const isJsonBody = options.body && !(options.body instanceof window.FormData)
  const formattedOptions = isJsonBody ? { ...options, body: JSON.stringify(options.body) } : options
  if (isOffline) {
    formattedOptions.headers = {
      ...formattedOptions.headers,
      [HEADER_CACHE_FIRST]: 'true',
    }
  }

  let res
  try {
    res = await lvConnect.api(cracraEndpoint + url, formattedOptions)
    if (res.headers.has('x-from-sw-cache') && !isOffline) {
      dispatch(switchOfflineMode(true))
    }
  } catch (e) {
    if (e.message === 'No refresh token found.') {
      dispatch(logout())
    } else {
      console.error(e)
    }
  }

  const data = await res.json()
  if (res.status > 400) {
    throw new HttpError(res.status, data.message)
  }

  return data
}

export const RECEIVE_USER_DATA = 'RECEIVE_USER_DATA'
export const receiveUserData = userData => ({
  type: RECEIVE_USER_DATA,
  payload: userData,
})

export const RECEIVE_USER_DATA_FAILED = 'RECEIVE_USER_DATA_FAILED'
export const receiveUserDataFailed = shouldClearUser => ({
  type: RECEIVE_USER_DATA_FAILED,
  payload: { shouldClearUser },
})

export const fetchUserData = () => dispatch =>
  dispatch(fetchWithAuth('/api/me'))
    .then((userData) => {
      window.gtag('set', { user_id: userData.id })
      if (userData.proofOfTransport) {
        dispatch(postTransportProofSuccess(userData.proofOfTransport))
      }
      dispatch(receiveUserData(userData))
      return userData
    })
    .catch((e) => {
      dispatch(receiveUserDataFailed(!(e instanceof TypeError)))
      return Promise.reject(e)
    })

export const tryReconnect = () => async (dispatch) => {
  await fetch('/api/health')
  dispatch(switchOfflineMode(false))
}
