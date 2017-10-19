import 'whatwg-fetch'
import LVConnectSDK from 'sdk-lvconnect'

import { cracraEndpoint, lvConnect } from './lvconnect'

export const LOGIN_ERROR = 'LOGIN_ERROR'
export const loginError = () => ({
  type: LOGIN_ERROR
})

export const loginDone = () => () => LVConnectSDK.handleLoginDone()

export const fetchWithAuth = (url, options = {}) => (dispatch, getState) =>
  lvConnect.api(cracraEndpoint + url, options)
    .then((res) => res.status >= 400 ? Promise.reject(res) : res.json())

export const RECEIVE_USER_DATA = 'RECEIVE_USER_DATA'
export const receiveUserData = (userData) => ({
  type: RECEIVE_USER_DATA,
  payload: userData
})

export const RECEIVE_USER_DATA_FAILED = 'RECEIVE_USER_DATA_FAILED'
export const receiveUserDataFailed = () => ({
  type: RECEIVE_USER_DATA_FAILED
})

export const fetchUserData = () => (dispatch) =>
  dispatch(fetchWithAuth('/api/me'))
    .then(userData => {
      dispatch(receiveUserData(userData))
      return userData
    })
    .catch(e => {
      dispatch(receiveUserDataFailed())
      return Promise.reject(e)
    })

export const LOGOUT = 'LOGOUT'
export const logout = () => {
  lvConnect.logout()

  return {
    type: LOGOUT
  }
}
