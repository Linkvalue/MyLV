import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import {
  clearPartnersSearch, fetchPartners, fetchPartnersSearch, fetchPartnersSuccess, PARTNERS_CLEAR_SEARCH,
  PARTNERS_FETCH_ERROR,
  PARTNERS_FETCH_SEARCH_SUCCESS, PARTNERS_FETCH_START, PARTNERS_FETCH_SUCCESS
} from '../partners.actions'
import { lvConnect } from '../../auth/lvconnect'
import { fetchWithAuth } from '../../auth/auth-actions'

jest.mock('../../auth/lvconnect', () => ({ lvConnect: { api: jest.fn() } }))
jest.mock('../../auth/auth-actions', () => ({ fetchWithAuth: jest.fn() }))
jest.unmock('../partners.actions')

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('partners.actions', () => {
  beforeEach(() => {
    lvConnect.api.mockImplementation(() => Promise.resolve({
      json: jest.fn(() => Promise.resolve({ foo: 'bar' }))
    }))
  })

  afterEach(() => {
    delete global.fetch
  })

  describe('fetchPartnersSearch', () => {
    it('should dispatch PARTNERS_FETCH_SEARCH_SUCCESS on success', async () => {
      // Given
      const store = mockStore()

      // When
      await store.dispatch(fetchPartnersSearch())

      // Then
      expect(store.getActions()).toEqual([{ type: PARTNERS_FETCH_SEARCH_SUCCESS, payload: { foo: 'bar' } }])
    })
  })

  describe('clearPartnersSearch', () => {
    it('should return PARTNERS_CLEAR_SEARCH action', () => {
      // When
      const action = clearPartnersSearch()

      // Then
      expect(action).toEqual({ type: PARTNERS_CLEAR_SEARCH })
    })
  })

  describe('fetchPartnersSuccess', () => {
    it('should return PARTNERS_FETCH_SUCCESS action', () => {
      // When
      const action = fetchPartnersSuccess({ foo: 'bar' })

      // Then
      expect(action).toEqual({ type: PARTNERS_FETCH_SUCCESS, payload: { foo: 'bar' } })
    })
  })

  describe('fetchPartners', () => {
    it('should dispatch PARTNERS_FETCH_START and PARTNERS_FETCH_SUCCESS when success', async () => {
      // Given
      const store = mockStore()
      fetchWithAuth.mockImplementation(() => () => Promise.resolve({ foo: 'bar' }))

      // When
      await store.dispatch(fetchPartners())

      // Then
      expect(store.getActions()).toEqual([
        { type: PARTNERS_FETCH_START, payload: { page: 1 } },
        { type: PARTNERS_FETCH_SUCCESS, payload: { foo: 'bar' } }
      ])
    })

    it('should dispatch PARTNERS_FETCH_START and PARTNERS_FETCH_ERROR on error', async () => {
      // Given
      const store = mockStore()
      fetchWithAuth.mockImplementation(() => () => Promise.reject())

      // When
      await store.dispatch(fetchPartners())

      // Then
      expect(store.getActions()).toEqual([
        { type: PARTNERS_FETCH_START, payload: { page: 1 } },
        { type: PARTNERS_FETCH_ERROR }
      ])
    })
  })
})
