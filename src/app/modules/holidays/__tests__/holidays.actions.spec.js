import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import {
  fetchHolidays,
  fetchPersonalHolidays, HOLIDAYS_FETCH_ERROR, HOLIDAYS_FETCH_START, HOLIDAYS_FETCH_SUCCESS,
  PERSONAL_HOLIDAYS_FETCH_ERROR,
  PERSONAL_HOLIDAYS_FETCH_START,
  PERSONAL_HOLIDAYS_FETCH_SUCCESS,
  postHoliday, putHoliday,
} from '../holidays.actions'
import { fetchWithAuth } from '../../auth/auth.actions'

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
      fetchWithAuth.mockImplementation(() => jest.fn(() => Promise.resolve({ foo: 'bar' })))

      // When
      await store.dispatch(fetchHolidays())

      // Then
      expect(store.getActions()).toEqual([
        { type: HOLIDAYS_FETCH_START },
        { type: HOLIDAYS_FETCH_SUCCESS, payload: { foo: 'bar' } },
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
        { type: HOLIDAYS_FETCH_START },
        { type: HOLIDAYS_FETCH_ERROR },
      ])
    })
  })
})
