import {
  SAVE_USER
} from '../actions/user-actions'

const initialState = {
  firstName: '',
  lastName: ''
}

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case SAVE_USER:
      return {
        firstName: payload.firstName,
        lastName: payload.lastName
      }
    default:
      return state
  }
}
