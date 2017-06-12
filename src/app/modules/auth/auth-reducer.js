import { REHYDRATE } from 'redux-persist'

import {
  RECEIVE_AUTH_TOKENS,
  RECEIVE_USER_DATA,
  RECEIVE_USER_DATA_FAILED
} from './auth-actions'

const initialState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  expiresAt: 0,
  awaitingLogin: true
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case RECEIVE_AUTH_TOKENS:
      return {
        ...state,
        accessToken: payload.accessToken,
        refreshToken: payload.refreshToken,
        expiresAt: payload.expiresAt
      }
    case RECEIVE_USER_DATA:
      return {
        ...state,
        user: payload,
        awaitingLogin: false
      }
    case RECEIVE_USER_DATA_FAILED:
      return {
        ...state,
        awaitingLogin: false
      }
    case REHYDRATE:
      return {
        ...state,
        accessToken: payload.accessToken,
        refreshToken: payload.refreshToken,
        expiresAt: payload.expiresAt
      }
    default:
      return state
  }
}
