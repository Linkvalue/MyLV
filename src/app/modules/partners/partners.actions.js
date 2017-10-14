import { lvConnect } from '../auth/lvconnect'

export const PARTNERS_FETCH_SEARCH_SUCCESS = 'PARTNERS_FETCH_SEARCH_SUCCESS'
export const fetchPartnersSearch = (search, excludeSelf) => (dispatch, getState) =>
  lvConnect.api(`/users?search=${search}`)
    .then(res => res.json())
    .then(data => dispatch({
      type: PARTNERS_FETCH_SEARCH_SUCCESS,
      payload: !excludeSelf ? data : {
        ...data,
        results: data.results.filter(partner => partner.id !== getState().auth.user.id)
      }
    }))

export const PARTNERS_CLEAR_SEARCH = 'PARTNERS_CLEAR_SEARCH'
export const clearPartnersSearch = () => ({ type: PARTNERS_CLEAR_SEARCH })

export const PARTNERS_FETCH_SUCCESS = 'PARTNERS_FETCH_SUCCESS'
export const fetchPartnersSuccess = data => ({ type: PARTNERS_FETCH_SUCCESS, payload: data })
