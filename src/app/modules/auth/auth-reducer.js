import { REHYDRATE } from 'redux-persist/constants'

import {
  LOGIN_ERROR,
  LOGOUT,
  RECEIVE_USER_DATA,
  RECEIVE_USER_DATA_FAILED
} from './auth-actions'

const initialState = {
  user: null,
  awaitingLogin: true
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_ERROR:
      return {
        ...state,
        error: true
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
      return payload.auth ? {
        ...state,
        user: null
      } : initialState
    case LOGOUT:
      return initialState
    default:
      return state
  }
}
