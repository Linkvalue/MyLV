import partnersReducer from '../partners.reducer'
import {
  PARTNERS_CLEAR_SEARCH, PARTNERS_FETCH_ERROR, PARTNERS_FETCH_SEARCH_SUCCESS, PARTNERS_FETCH_START,
  PARTNERS_FETCH_SUCCESS,
} from '../partners.actions'

jest.unmock('../partners.reducer')
jest.unmock('../partners.actions')

describe('partners.reducer', () => {
  it('should handle PARTNERS_FETCH_SEARCH_SUCCESS', () => {
    // Given
    const action = {
      type: PARTNERS_FETCH_SEARCH_SUCCESS,
      payload: {
        results: [{ id: 'foo' }],
      },
    }

    // When
    const state = partnersReducer({}, action)

    // Then
    expect(state).toEqual({
      partnersById: {
        foo: { id: 'foo' },
      },
      partnersSearchResults: ['foo'],
    })
  })

  it('should handle PARTNERS_CLEAR_SEARCH', () => {
    // Given
    const action = { type: PARTNERS_CLEAR_SEARCH }

    // When
    const state = partnersReducer({}, action)

    // Then
    expect(state).toEqual({
      partnersSearchResults: [],
    })
  })

  it('should handle PARTNERS_FETCH_START', () => {
    // Given
    const action = { type: PARTNERS_FETCH_START, payload: { limit: 42 } }

    // When
    const state = partnersReducer({}, action)

    // Then
    expect(state).toEqual({
      partnersList: [],
      isLoading: true,
      limit: 42,
    })
  })

  it('should handle PARTNERS_FETCH_SUCCESS', () => {
    // Given
    const action = {
      type: PARTNERS_FETCH_SUCCESS,
      payload: {
        pageCount: 42,
        results: [{ id: 'foo' }],
      },
    }

    // When
    const state = partnersReducer({ isLoading: true }, action)

    // Then
    expect(state).toEqual({
      partnersById: {
        foo: { id: 'foo' },
      },
      partnersList: ['foo'],
      isLoading: false,
      pageCount: 42,
    })
  })

  it('should handle PARTNERS_FETCH_ERROR', () => {
    // Given
    const action = { type: PARTNERS_FETCH_ERROR }

    // When
    const state = partnersReducer({ isLoading: true }, action)

    // Then
    expect(state).toEqual({
      isLoading: false,
    })
  })
})
