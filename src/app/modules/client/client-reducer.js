import {
  SAVE_CLIENT,
} from './client-actions'

const initialState = {
  firstName: '',
  lastName: '',
  clientName: '',
  clientAddress: '',
  managerName: '',
}

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case SAVE_CLIENT:
      return {
        firstName: payload.firstName,
        lastName: payload.lastName,
        clientName: payload.clientName,
        clientAddress: payload.clientAddress,
        managerName: payload.managerName,
      }
    default:
      return state
  }
}
