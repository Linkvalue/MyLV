import 'whatwg-fetch'
import LVConnectSDK from 'sdk-lvconnect'
import { push } from 'react-router-redux'

import { cracraEndpoint, lvConnect } from './lvconnect'
import { postTransportProofSuccess } from '../transport/transport.actions'
import { switchOfflineMode } from '../display/display.actions'

export const LOGIN_ERROR = 'LOGIN_ERROR'
export const loginError = () => ({
  type: LOGIN_ERROR,
})

export const loginDone = () => () => LVConnectSDK.handleLoginDone()

class HttpError extends Error {
  constructor(status, message) {
    super(message)
    this.status = status
  }
}

export const fetchWithAuth = (url, options = {}, forceWhenOffline) => async (dispatch, getState) => {
  const { isOffline } = getState().display
  if (isOffline && !forceWhenOffline) {
    throw new Error('Offline')
  }

  const isJsonBody = options.body && !(options.body instanceof window.FormData)
  const formattedOptions = isJsonBody ? { ...options, body: JSON.stringify(options.body) } : options

  let res
  try {
    res = await lvConnect.api(cracraEndpoint + url, formattedOptions)
  } catch (e) {
    if (e instanceof TypeError && !isOffline) {
      dispatch(switchOfflineMode(true))
    } else {
      throw new Error('Required login')
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
      dispatch(receiveUserData(userData))
      if (userData.proofOfTransport) {
        dispatch(postTransportProofSuccess(userData.proofOfTransport))
      }
      return userData
    })
    .catch((e) => {
      dispatch(receiveUserDataFailed(!(e instanceof TypeError)))
      return Promise.reject(e)
    })

export const tryReconnect = () => async (dispatch) => {
  try {
    await dispatch(fetchWithAuth('/api/health', undefined, true))
    dispatch(switchOfflineMode(false))
  } catch (e) {
    // Don't care about the error
  }
}

export const LOGOUT = 'LOGOUT'
export const logout = () => (dispatch) => {
  lvConnect.logout()

  dispatch(push('/login'))

  return dispatch({
    type: LOGOUT,
  })
}
