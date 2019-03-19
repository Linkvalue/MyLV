import { change } from 'redux-form'
import moment from 'moment'
import qs from 'qs'

import { fetchWithAuth } from '../auth/auth.actions'
import { fetchPartnersSuccess } from '../partners/partners.actions'
import { pushAlert } from '../display/display.actions'
import { ALERT_ERROR, ALERT_INFO } from '../display/display.constants'

export const setExpirationDateToCurrentMonth = () => (dispatch) => {
  const startingDate = moment().set('date', 1).format('YYYY-MM-DD')
  const expirationDate = moment().add(1, 'month').set('date', 1).format('YYYY-MM-DD')
  dispatch(change('transportProofUploadForm', 'startingDate', startingDate))
  dispatch(change('transportProofUploadForm', 'expirationDate', expirationDate))
}

export const TRANSPORT_UPLOAD_PROOF_SUCCESS = 'TRANSPORT_UPLOAD_PROOF_SUCCESS'
export const postTransportProofSuccess = data => ({ type: TRANSPORT_UPLOAD_PROOF_SUCCESS, payload: data })

export const postTransportProof = formData => async (dispatch) => {
  try {
    const data = await dispatch(fetchWithAuth('/api/proofOfTransport', {
      method: 'POST',
      body: formData,
    }))
    dispatch(postTransportProofSuccess(data))
    dispatch(pushAlert({
      type: ALERT_INFO,
      message: 'Titre de transport uploadé avec succès',
    }))
  } catch (e) {
    dispatch(pushAlert({
      type: ALERT_ERROR,
      message: 'Une erreur est survenue lors de l\'upload.',
    }))
  }
}

export const TRANSPORT_PROOFS_FETCH_START = 'TRANSPORT_PROOFS_FETCH_START'
export const TRANSPORT_PROOFS_FETCH_SUCCESS = 'TRANSPORT_PROOFS_FETCH_SUCCESS'
export const TRANSPORT_PROOFS_FETCH_ERROR = 'TRANSPORT_PROOFS_FETCH_ERROR'
export const fetchTransportProofs = (params = { page: 1 }) => async (dispatch) => {
  dispatch({ type: TRANSPORT_PROOFS_FETCH_START, payload: params })

  const query = qs.stringify(params)

  try {
    const data = await dispatch(fetchWithAuth(`/api/proofOfTransport?${query}`))
    const partners = new Map()
    data.results.forEach(({ user }) => user && partners.set(user.id, user))
    dispatch(fetchPartnersSuccess({ results: Array.from(partners.values()), pageCount: 1 }))
    dispatch({
      type: TRANSPORT_PROOFS_FETCH_SUCCESS,
      payload: {
        ...data,
        results: data.results.map(({ user, ...holiday }) => ({ ...holiday, user: user && user.id })),
      },
    })
  } catch (e) {
    dispatch({ type: TRANSPORT_PROOFS_FETCH_ERROR, payload: e })
  }
}

export const TRANSPORT_PROOF_DELETE_SUCCESS = 'TRANSPORT_PROOF_DELETE_SUCCESS'
export const deleteTransportProof = proof => async (dispatch) => {
  try {
    await dispatch(fetchWithAuth(`/api/proofOfTransport/${proof.id}`, { method: 'DELETE' }))
    dispatch({ type: TRANSPORT_PROOF_DELETE_SUCCESS, payload: { id: proof.id } })
    dispatch(pushAlert({
      type: ALERT_INFO,
      message: 'Titre de transport supprimé',
    }))
  } catch (e) {
    dispatch(pushAlert({
      type: ALERT_ERROR,
      message: 'Erreur lors de la suppression',
    }))
  }
}
