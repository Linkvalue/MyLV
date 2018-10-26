import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import {
  fetchUserLunches,
  PERSONAL_LUNCHES_FETCH_START,
  PERSONAL_LUNCHES_FETCH_SUCCESS,
  PERSONAL_LUNCHES_FETCH_ERROR,
  postLunch,
  putLunch,
  deleteLunch,
  LUNCH_DELETE_SUCCESS,
} from '../lunches.actions'
import { fetchWithAuth } from '../../auth/auth.actions'

jest.unmock('../lunches.actions')

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('lunches.actions', () => {
  describe('fetchUserLunches', () => {
    it('should dispatch START and SUCCESS if api call is succeeded', async () => {
      // Given
      const store = mockStore()
      fetchWithAuth.mockImplementation(() => jest.fn(() => Promise.resolve({ foo: 'bar' })))

      // When
      await store.dispatch(fetchUserLunches())

      // Then
      expect(store.getActions()).toEqual([
        { type: PERSONAL_LUNCHES_FETCH_START },
        { type: PERSONAL_LUNCHES_FETCH_SUCCESS, payload: { foo: 'bar' } },
      ])
    })

    it('should dispatch START and ERROR if api call is failed', async () => {
      // Given
      const store = mockStore()
      fetchWithAuth.mockImplementation(() => jest.fn(() => Promise.reject()))

      // When
      await store.dispatch(fetchUserLunches())

      // Then
      expect(store.getActions()).toEqual([
        { type: PERSONAL_LUNCHES_FETCH_START },
        { type: PERSONAL_LUNCHES_FETCH_ERROR },
      ])
    })
  })

  describe('postLunch', () => {
    it('should dispatch API call', async () => {
      // Given
      const store = mockStore()
      fetchWithAuth.mockImplementation(() => jest.fn())

      // When
      await store.dispatch(postLunch({ foo: 'bar' }))

      // Then
      expect(fetchWithAuth).toHaveBeenCalledWith('/api/lunches', { method: 'POST', body: { foo: 'bar' } })
    })
  })

  describe('putLunch', () => {
    it('should dispatch API call', async () => {
      // Given
      const store = mockStore()
      fetchWithAuth.mockImplementation(() => jest.fn())

      // When
      await store.dispatch(putLunch({ id: 'hello', foo: 'bar' }))

      // Then
      expect(fetchWithAuth).toHaveBeenCalledWith('/api/lunches/hello', { method: 'PUT', body: { foo: 'bar' } })
    })
  })

  describe('deleteLunch', () => {
    it('should dispatch LUNCH_DELETE_SUCCESS is success', async () => {
      // Given
      const store = mockStore()
      fetchWithAuth.mockImplementation(() => jest.fn(() => Promise.resolve()))

      // When
      await store.dispatch(deleteLunch('foo'))

      // Then
      expect(fetchWithAuth).toHaveBeenCalledWith('/api/lunches/foo', { method: 'DELETE' })
      expect(store.getActions()).toEqual([
        { type: LUNCH_DELETE_SUCCESS, payload: { id: 'foo' } },
      ])
    })
  })
})
