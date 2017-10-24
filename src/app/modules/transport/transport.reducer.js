import moment from 'moment'

import { TRANSPORT_UPLOAD_PROOF_SUCCESS } from './transport.actions'

const initialState = {
  expirationDate: 0,
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case TRANSPORT_UPLOAD_PROOF_SUCCESS:
      return {
        ...state,
        expirationDate: Number(moment(payload.expirationDate).format('x')),
      }
    default:
      return state
  }
}
