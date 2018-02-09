import { change } from 'redux-form'
import moment from 'moment'

import { fetchWithAuth } from '../auth/auth.actions'

export const setExpirationDateToCurrentMonth = () => (dispatch) => {
  const startingDate = moment().set('date', 1).format('DD/MM/YYYY')
  const expirationDate = moment().add(1, 'month').set('date', 1).format('DD/MM/YYYY')
  dispatch(change('transportProofUploadForm', 'startingDate', startingDate))
  dispatch(change('transportProofUploadForm', 'expirationDate', expirationDate))
}

export const TRANSPORT_UPLOAD_PROOF_SUCCESS = 'TRANSPORT_UPLOAD_PROOF_SUCCESS'
export const postTransportProofSuccess = data => ({ type: TRANSPORT_UPLOAD_PROOF_SUCCESS, payload: data })

export const postTransportProof = formData => dispatch =>
  dispatch(fetchWithAuth('/api/proofOfTransport', {
    method: 'POST',
    body: formData,
  }))
    .then(data => dispatch(postTransportProofSuccess(data)))
