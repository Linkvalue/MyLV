import { change } from 'redux-form'
import moment from 'moment'

import { fetchWithAuth } from '../auth/auth.actions'

export const setExpirationDateToCurrentMonth = () => dispatch => {
  dispatch(change('transportProofUploadForm', 'startingDate', moment().set('date', 1).format('DD/MM/YYYY')))
  dispatch(change('transportProofUploadForm', 'expirationDate', moment().add(1, 'month').set('date', 1).format('DD/MM/YYYY')))
}

export const TRANSPORT_UPLOAD_PROOF_SUCCESS = 'TRANSPORT_UPLOAD_PROOF_SUCCESS'
export const postTransportProofSuccess = data => ({ type: TRANSPORT_UPLOAD_PROOF_SUCCESS, payload: data })

export const postTransportProof = formData => dispatch =>
  dispatch(fetchWithAuth('/api/proofOfTransport', {
    method: 'POST',
    body: formData,
  }))
    .then(data => dispatch(postTransportProofSuccess(data)))
