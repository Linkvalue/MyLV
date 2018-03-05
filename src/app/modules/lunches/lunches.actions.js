import { fetchWithAuth } from '../auth/auth.actions'
import { fetchPartnersSuccess } from '../partners/partners.actions'

export const LUNCHES_FETCH_START = 'LUNCHES_FETCH_START'
export const LUNCHES_FETCH_SUCCESS = 'LUNCHES_FETCH_SUCCESS'
export const fetchUserLunches = () => async (dispatch) => {
  dispatch({ type: LUNCHES_FETCH_START })
  const data = await dispatch(fetchWithAuth('/api/lunches'))
  dispatch({ type: LUNCHES_FETCH_SUCCESS, payload: data })
}

export const LUNCHES_FETCH_DETAILS_START = 'LUNCHES_FETCH_DETAILS_START'
export const LUNCHES_FETCH_DETAILS_SUCCESS = 'LUNCHES_FETCH_DETAILS_SUCCESS'
export const LUNCHES_FETCH_DETAILS_ERROR = 'LUNCHES_FETCH_DETAILS_ERROR'
export const fetchLunchDetails = lunchId => (dispatch) => {
  dispatch({ type: LUNCHES_FETCH_DETAILS_START })

  return dispatch(fetchWithAuth(`/api/lunches/${lunchId}`))
    .then((data) => {
      dispatch({ type: LUNCHES_FETCH_DETAILS_SUCCESS, payload: data })
      dispatch(fetchPartnersSuccess({ results: data.attendees }))
    })
    .catch(() => dispatch({ type: LUNCHES_FETCH_DETAILS_ERROR }))
}

export const postLunch = lunch => dispatch => dispatch(fetchWithAuth('/api/lunches', {
  method: 'POST',
  body: lunch,
}))

export const putLunch = ({ id, ...lunch }) => dispatch =>
  dispatch(fetchWithAuth(`/api/lunches/${id}`, {
    method: 'PUT',
    body: lunch,
  }))

export const LUNCH_DELETE_SUCCESS = 'LUNCH_DELETE_SUCCESS'
export const deleteLunch = id => dispatch =>
  dispatch(fetchWithAuth(`/api/lunches/${id}`, { method: 'DELETE' }))
    .then(() => dispatch({ type: LUNCH_DELETE_SUCCESS, payload: { id } }))
