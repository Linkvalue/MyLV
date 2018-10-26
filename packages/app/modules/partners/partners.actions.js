import * as qs from 'qs'

import { lvConnect } from '../auth/lvconnect'
import { fetchWithAuth } from '../auth/auth.actions'

export const PARTNERS_FETCH_SEARCH_SUCCESS = 'PARTNERS_FETCH_SEARCH_SUCCESS'
export const fetchPartnersSearch = (search, excludeSelf) => (dispatch, getState) =>
  lvConnect.api(`/users?search=${search}&limit=5`)
    .then(res => res.json())
    .then(data => dispatch({
      type: PARTNERS_FETCH_SEARCH_SUCCESS,
      payload: !excludeSelf ? data : {
        ...data,
        results: data.results.filter(partner => partner.id !== getState().auth.user.id),
      },
    }))
    .catch(e => console.error(e))

export const PARTNERS_CLEAR_SEARCH = 'PARTNERS_CLEAR_SEARCH'
export const clearPartnersSearch = () => ({ type: PARTNERS_CLEAR_SEARCH })

export const PARTNERS_FETCH_SUCCESS = 'PARTNERS_FETCH_SUCCESS'
export const fetchPartnersSuccess = data => ({ type: PARTNERS_FETCH_SUCCESS, payload: data })

export const PARTNERS_FETCH_START = 'PARTNERS_FETCH_START'
export const PARTNERS_FETCH_ERROR = 'PARTNERS_FETCH_ERROR'
export const fetchPartners = (params = { page: 1 }) => (dispatch) => {
  dispatch({ type: PARTNERS_FETCH_START, payload: params })

  const query = qs.stringify(params)

  return dispatch(fetchWithAuth(`/api/partners?${query}`))
    .then(data => dispatch(fetchPartnersSuccess(data)))
    .catch(() => dispatch({ type: PARTNERS_FETCH_ERROR }))
}

export const notifyAllPartners = () => dispatch => dispatch(fetchWithAuth('/api/worklog/notify', { method: 'POST' }))
