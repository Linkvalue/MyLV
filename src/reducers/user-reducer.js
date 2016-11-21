import {
  SAVE_USER
} from '../actions/user-actions'

const initialState = {
  firstName: '',
  lastName: '',
  clientName: '',
  clientAddress: ''
}

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case SAVE_USER:
      return {
        firstName: payload.firstName,
        lastName: payload.lastName,
        clientName: payload.clientName,
        clientAddress: payload.clientAddress
      }
    default:
      return state
  }
}
