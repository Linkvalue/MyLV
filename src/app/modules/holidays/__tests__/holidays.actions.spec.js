import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import {
  fetchHolidayRequestDetails,
  HOLIDAY_DETAILS_FETCH_START,
  HOLIDAY_DETAILS_FETCH_SUCCESS,
  HOLIDAY_DETAILS_FETCH_ERROR,
  fetchHolidays,
  fetchPersonalHolidays,
  HOLIDAYS_FETCH_ERROR,
  HOLIDAYS_FETCH_START,
  HOLIDAYS_FETCH_SUCCESS,
  PERSONAL_HOLIDAYS_FETCH_ERROR,
  PERSONAL_HOLIDAYS_FETCH_START,
  PERSONAL_HOLIDAYS_FETCH_SUCCESS,
  postHoliday,
  putHoliday,
} from '../holidays.actions'
import { fetchWithAuth } from '../../auth/auth.actions'
import { fetchPartnersSuccess, PARTNERS_FETCH_SUCCESS } from '../../partners/partners.actions'

jest.unmock('../holidays.actions')

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('holidays.actions', () => {
  describe('fetchPersonalHolidays', () => {
    it('should dispatch START and SUCCESS if api call is succeeded', async () => {
      // Given
      const store = mockStore()
      fetchWithAuth.mockImplementation(() => jest.fn(() => Promise.resolve({ foo: 'bar' })))

      // When
      await store.dispatch(fetchPersonalHolidays())

      // Then
      expect(store.getActions()).toEqual([
        { type: PERSONAL_HOLIDAYS_FETCH_START },
        { type: PERSONAL_HOLIDAYS_FETCH_SUCCESS, payload: { foo: 'bar' } },
      ])
    })

    it('should dispatch START and ERROR if api call is failed', async () => {
      // Given
      const store = mockStore()
      fetchWithAuth.mockImplementation(() => jest.fn(() => Promise.reject()))

      // When
      await store.dispatch(fetchPersonalHolidays())

      // Then
      expect(store.getActions()).toEqual([
        { type: PERSONAL_HOLIDAYS_FETCH_START },
        { type: PERSONAL_HOLIDAYS_FETCH_ERROR },
      ])
    })
  })

  describe('postHoliday', () => {
    it('should dispatch API call', async () => {
      // Given
      const store = mockStore()
      fetchWithAuth.mockImplementation(() => jest.fn())

      // When
      await store.dispatch(postHoliday({ foo: 'bar' }))

      // Then
      expect(fetchWithAuth).toHaveBeenCalledWith('/api/holidays', { method: 'POST', body: { foo: 'bar' } })
    })
  })

  describe('putHoliday', () => {
    it('should dispatch API call', async () => {
      // Given
      const store = mockStore()
      fetchWithAuth.mockImplementation(() => jest.fn())

      // When
      await store.dispatch(putHoliday({ id: 'hello', foo: 'bar' }))

      // Then
      expect(fetchWithAuth).toHaveBeenCalledWith('/api/holidays/hello', { method: 'PUT', body: { foo: 'bar' } })
    })
  })

  describe('fetchHolidays', () => {
    it('should dispatch START and SUCCESS if api call is succeeded', async () => {
      // Given
      const store = mockStore()
      fetchWithAuth.mockImplementation(() => jest.fn(() => Promise.resolve({
        results: [{ user: { id: 'yolo' } }],
      })))
      fetchPartnersSuccess.mockImplementation(payload => ({ type: PARTNERS_FETCH_SUCCESS, payload }))

      // When
      await store.dispatch(fetchHolidays({ page: 2, limit: 30 }))

      // Then
      expect(store.getActions()).toEqual([
        { type: HOLIDAYS_FETCH_START, payload: { page: 2, limit: 30 } },
        { type: HOLIDAYS_FETCH_SUCCESS, payload: { results: [{ user: 'yolo' }] } },
        { type: PARTNERS_FETCH_SUCCESS, payload: { results: [{ id: 'yolo' }] } },
      ])
    })

    it('should dispatch START and ERROR if api call is failed', async () => {
      // Given
      const store = mockStore()
      fetchWithAuth.mockImplementation(() => jest.fn(() => Promise.reject()))

      // When
      await store.dispatch(fetchHolidays())

      // Then
      expect(store.getActions()).toEqual([
        { type: HOLIDAYS_FETCH_START, payload: { page: 1 } },
        { type: HOLIDAYS_FETCH_ERROR },
      ])
    })
  })

  describe('fetchHolidayRequestDetails', () => {
    it('should dispatch START and SUCCESS if api call is succeeded', async () => {
      // Given
      const store = mockStore()
      fetchWithAuth.mockImplementation(() => jest.fn(() => Promise.resolve({ user: { id: 'yolo' }, foo: 'bar' })))
      fetchPartnersSuccess.mockImplementation(payload => ({ type: PARTNERS_FETCH_SUCCESS, payload }))

      // When
      await store.dispatch(fetchHolidayRequestDetails('foo'))

      // Then
      expect(fetchWithAuth).toHaveBeenCalledWith('/api/holidays/foo')
      expect(store.getActions()).toEqual([
        { type: HOLIDAY_DETAILS_FETCH_START },
        { type: HOLIDAY_DETAILS_FETCH_SUCCESS, payload: { user: 'yolo', foo: 'bar' } },
        { type: PARTNERS_FETCH_SUCCESS, payload: { results: [{ id: 'yolo' }] } },
      ])
    })

    it('should dispatch START and ERROR if api call is failed', async () => {
      // Given
      const store = mockStore()
      fetchWithAuth.mockImplementation(() => jest.fn(() => Promise.reject()))

      // When
      await store.dispatch(fetchHolidayRequestDetails('foo'))

      // Then
      expect(store.getActions()).toEqual([
        { type: HOLIDAY_DETAILS_FETCH_START },
        { type: HOLIDAY_DETAILS_FETCH_ERROR },
      ])
    })
  })
})
