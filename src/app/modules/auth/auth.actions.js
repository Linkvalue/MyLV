import 'whatwg-fetch'
import LVConnectSDK from 'sdk-lvconnect'
import { push } from 'react-router-redux'

import { cracraEndpoint, lvConnect } from './lvconnect'
import { postTransportProofSuccess } from '../transport/transport.actions'

export const LOGIN_ERROR = 'LOGIN_ERROR'
export const loginError = () => ({
  type: LOGIN_ERROR,
})

export const loginDone = () => () => LVConnectSDK.handleLoginDone()

export const fetchWithAuth = (url, options = {}) => () => {
  const isJsonBody = options.body && !(options.body instanceof window.FormData)
  const formattedOptions = isJsonBody ? { ...options, body: JSON.stringify(options.body) } : options
  return lvConnect.api(cracraEndpoint + url, formattedOptions)
    .then(res => (res.status >= 400 ? Promise.reject(res) : res.json()))
}

export const RECEIVE_USER_DATA = 'RECEIVE_USER_DATA'
export const receiveUserData = userData => ({
  type: RECEIVE_USER_DATA,
  payload: userData,
})

export const RECEIVE_USER_DATA_FAILED = 'RECEIVE_USER_DATA_FAILED'
export const receiveUserDataFailed = () => ({
  type: RECEIVE_USER_DATA_FAILED,
})

export const fetchUserData = () => dispatch =>
  dispatch(fetchWithAuth('/api/me'))
    .then((userData) => {
      dispatch(receiveUserData(userData))
      if (userData.proofOfTransport) {
        dispatch(postTransportProofSuccess(userData.proofOfTransport))
      }
      return userData
    })
    .catch((e) => {
      dispatch(receiveUserDataFailed())
      return Promise.reject(e)
    })

export const LOGOUT = 'LOGOUT'
export const logout = () => (dispatch) => {
  lvConnect.logout()

  dispatch(push('/login'))

  return dispatch({
    type: LOGOUT,
  })
}
