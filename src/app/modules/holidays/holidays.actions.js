import { fetchWithAuth } from '../auth/auth.actions'

export const HOLIDAYS_FETCH_START = 'HOLIDAYS_FETCH_START'
export const HOLIDAYS_FETCH_SUCCESS = 'HOLIDAYS_FETCH_SUCCESS'
export const HOLIDAYS_FETCH_ERROR = 'HOLIDAYS_FETCH_ERROR'
export const fetchHolidays = () => (dispatch) => {
  dispatch({ type: HOLIDAYS_FETCH_START })

  return dispatch(fetchWithAuth('/api/holidays'))
    .then(holidays => dispatch({ type: HOLIDAYS_FETCH_SUCCESS, payload: holidays }))
    .catch(e => dispatch({ type: HOLIDAYS_FETCH_ERROR, payload: e }))
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
