import { push } from 'react-router-redux'
import 'whatwg-fetch'

export const RECEIVE_AUTH_TOKENS = 'RECEIVE_AUTH_TOKENS'
export const receiveAuthTokens = (authData) => ({
  type: RECEIVE_AUTH_TOKENS,
  payload: {
    accessToken: authData.access_token,
    refreshToken: authData.refresh_token,
    expiresAt: Date.now() + authData.expires_in
  }
})

export const authenticateFromCode = (code) => (dispatch) => {
  return window
    .fetch('/api/auth', {
      method: 'POST',
      body: JSON.stringify({
        grant_type: 'authorization_code',
        code
      })
    })
    .then(res => res.json())
    .then(res => {
      if (res.error) {
        return Promise.reject(res)
      }

      dispatch(receiveAuthTokens(res))
      return res
    })
}

let authFromRefreshPromise
export const authenticateFromRefreshToken = (refreshToken) => (dispatch) => {
  if (authFromRefreshPromise) {
    return authFromRefreshPromise
  }

  authFromRefreshPromise = window
    .fetch('/api/auth', {
      method: 'POST',
      body: JSON.stringify({
        grant_type: 'refresh_token',
        refresh_token: refreshToken
      })
    })
    .then(res => res.json())
    .then(res => {
      authFromRefreshPromise = null

      if (res.error) {
        dispatch(push('/login'))
        return Promise.reject(res)
      }

      dispatch(receiveAuthTokens(res.access_token, res.refresh_token, res.expires_in))
      return res
    })
    .catch(e => {
      authFromRefreshPromise = null
      return Promise.reject(e)
    })

  return authFromRefreshPromise
}

export const fetchWithAuth = (url, options = {}) => (dispatch, getState) => {
  const { auth: { expiresAt, accessToken, refreshToken } } = getState()

  if (!accessToken && !refreshToken) {
    dispatch(push('/login'))
    return Promise.reject()
  }

  const fetchWithAuthHeaders = ({ access_token: token }) => window
    .fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => res.json())

  let promise = Promise.resolve({ access_token: accessToken })
  if (refreshToken && expiresAt < Date.now()) {
    promise = dispatch(authenticateFromRefreshToken(refreshToken))
  }

  return promise.then(fetchWithAuthHeaders)
    .then(res => {
      if (res.statusCode === 403) {
        if (!refreshToken) {
          dispatch(push('/login'))
          return Promise.reject(res)
        }

        return dispatch(authenticateFromRefreshToken(refreshToken))
          .then(fetchWithAuthHeaders)
      }

      return res
    })
}

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
