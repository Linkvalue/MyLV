import * as qs from 'qs'

import { fetchWithAuth } from '../auth/auth.actions'
import { fetchPartnersSuccess } from '../partners/partners.actions'

export const HOLIDAYS_FETCH_START = 'HOLIDAYS_FETCH_START'
export const HOLIDAYS_FETCH_SUCCESS = 'HOLIDAYS_FETCH_SUCCESS'
export const HOLIDAYS_FETCH_ERROR = 'HOLIDAYS_FETCH_ERROR'
export const fetchHolidays = (params = { page: 1 }) => async (dispatch) => {
  dispatch({ type: HOLIDAYS_FETCH_START, payload: params })

  const query = qs.stringify(params)

  try {
    const data = await dispatch(fetchWithAuth(`/api/holidays?${query}`))
    dispatch({
      type: HOLIDAYS_FETCH_SUCCESS,
      payload: {
        ...data,
        results: data.results.map(({ user, ...holiday }) => ({ ...holiday, user: user && user.id })),
      },
    })
    const partners = new Set()
    data.results.forEach(({ user }) => user && partners.add(user))
    dispatch(fetchPartnersSuccess({ results: Array.from(partners.values()), pageCount: 1 }))
  } catch (e) {
    dispatch({ type: HOLIDAYS_FETCH_ERROR, payload: e })
  }
}

export const PERSONAL_HOLIDAYS_FETCH_START = 'PERSONAL_HOLIDAYS_FETCH_START'
export const PERSONAL_HOLIDAYS_FETCH_SUCCESS = 'PERSONAL_HOLIDAYS_FETCH_SUCCESS'
export const PERSONAL_HOLIDAYS_FETCH_ERROR = 'PERSONAL_HOLIDAYS_FETCH_ERROR'
export const fetchPersonalHolidays = () => (dispatch) => {
  dispatch({ type: PERSONAL_HOLIDAYS_FETCH_START })

  return dispatch(fetchWithAuth('/api/holidays/me'))
    .then(holidays => dispatch({ type: PERSONAL_HOLIDAYS_FETCH_SUCCESS, payload: holidays }))
    .catch(e => dispatch({ type: PERSONAL_HOLIDAYS_FETCH_ERROR, payload: e }))
}

export const PARTNER_HOLIDAYS_FETCH_START = 'PARTNER_HOLIDAYS_FETCH_START'
export const PARTNER_HOLIDAYS_FETCH_SUCCESS = 'PARTNER_HOLIDAYS_FETCH_SUCCESS'
export const PARTNER_HOLIDAYS_FETCH_ERROR = 'PARTNER_HOLIDAYS_FETCH_ERROR'
export const fetchPartnerHolidays = partnerId => (dispatch) => {
  dispatch({ type: PARTNER_HOLIDAYS_FETCH_START })

  return dispatch(fetchWithAuth(`/api/partner/${partnerId}/holidays`))
    .then(holidays => dispatch({ type: PARTNER_HOLIDAYS_FETCH_SUCCESS, payload: holidays }))
    .catch(e => dispatch({ type: PARTNER_HOLIDAYS_FETCH_ERROR, payload: e }))
}

export const postHoliday = holiday => dispatch => dispatch(fetchWithAuth('/api/holidays', {
  method: 'POST',
  body: holiday,
}))

export const putHoliday = ({ id, ...holiday }) => dispatch => dispatch(fetchWithAuth(`/api/holidays/${id}`, {
  method: 'PUT',
  body: holiday,
}))

export const HOLIDAY_DELETE_SUCCESS = 'HOLIDAY_DELETE_SUCCESS'
export const deleteHoliday = id => dispatch =>
  dispatch(fetchWithAuth(`/api/holidays/${id}`, { method: 'DELETE' }))
    .then(() => dispatch({ type: HOLIDAY_DELETE_SUCCESS, payload: { id } }))

export const HOLIDAY_DETAILS_FETCH_START = 'HOLIDAY_DETAILS_FETCH_START'
export const HOLIDAY_DETAILS_FETCH_SUCCESS = 'HOLIDAY_DETAILS_FETCH_SUCCESS'
export const HOLIDAY_DETAILS_FETCH_ERROR = 'HOLIDAY_DETAILS_FETCH_ERROR'
export const fetchHolidayRequestDetails = id => async (dispatch) => {
  dispatch({ type: HOLIDAY_DETAILS_FETCH_START })

  try {
    const { user: partner, ...holidayRequest } = await dispatch(fetchWithAuth(`/api/holidays/${id}`))
    dispatch(fetchPartnersSuccess({ results: [partner] }))
    dispatch({
      type: HOLIDAY_DETAILS_FETCH_SUCCESS,
      payload: { ...holidayRequest, user: partner.id },
    })
  } catch (e) {
    dispatch({ type: HOLIDAY_DETAILS_FETCH_ERROR, payload: e })
  }
}

export const HOLIDAY_CHANGE_STATUS_SUCCESS = 'HOLIDAY_CHANGE_STATUS_SUCCESS'
export const changeHolidayRequestStatus = (id, status) => async (dispatch) => {
  try {
    const updatedRequest = await dispatch(fetchWithAuth(`/api/holidays/${id}/changeStatus`, {
      method: 'POST',
      body: {
        status,
      },
    }))

    dispatch({ type: HOLIDAY_CHANGE_STATUS_SUCCESS, payload: updatedRequest })
  } catch (e) {
    console.error(e)
  }
}

