import {
  SAVE_USER
} from '../actions/user-actions'

const initialState = {
  user: {
    firstName: 'Gabriel',
    lastName: 'Hofman'
  }
}

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case SAVE_USER:
      return {
        ...state,
        user: {
          firstName: payload.firstName,
          lastName: payload.lastName
        }
      }
    default:
      return state
  }
}
