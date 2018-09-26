import {
  LUNCH_DELETE_SUCCESS,
  PERSONAL_LUNCHES_FETCH_ERROR,
  PERSONAL_LUNCHES_FETCH_START,
  PERSONAL_LUNCHES_FETCH_SUCCESS,
} from '../lunches.actions'
import lunchesReducer from '../lunches.reducer'

jest.unmock('../lunches.actions')
jest.unmock('../lunches.reducer')

describe('lunches.reducer', () => {
  it('should handle PERSONAL_LUNCHES_FETCH_START action', () => {
    // Given
    const action = { type: PERSONAL_LUNCHES_FETCH_START }

    // When
    const state = lunchesReducer({ lunchesList: ['foo'] }, action)

    // Then
    expect(state).toEqual({
      lunchesList: ['foo'],
      isLoading: true,
    })
  })

  it('should handle PERSONAL_LUNCHES_FETCH_SUCCESS action', () => {
    // Given
    const action = {
      type: PERSONAL_LUNCHES_FETCH_SUCCESS,
      payload: {
        results: [{ id: 'foo' }],
        page: 1,
        pageCount: 20,
      },
    }

    // When
    const state = lunchesReducer({ lunchesList: [], isLoading: true }, action)

    // Then
    expect(state).toEqual({
      lunchesById: {
        foo: { id: 'foo' },
      },
      lunchesList: ['foo'],
      page: 1,
      pageCount: 20,
      isLoading: false,
    })
  })

  it('should handle PERSONAL_LUNCHES_FETCH_ERROR action', () => {
    // Given
    const action = { type: PERSONAL_LUNCHES_FETCH_ERROR }

    // When
    const state = lunchesReducer({ isLoading: true }, action)

    // Then
    expect(state).toEqual({ isLoading: false })
  })

  it('should handle LUNCH_DELETE_SUCCESS action', () => {
    // Given
    const action = { type: LUNCH_DELETE_SUCCESS, payload: { id: 'foo' } }

    // When
    const state = lunchesReducer({
      lunchesById: { foo: { id: 'foo' }, bar: { id: 'bar' } },
      lunchesList: ['foo', 'bar'],
    }, action)

    // Then
    expect(state).toEqual({
      lunchesById: { bar: { id: 'bar' } },
      lunchesList: ['bar'],
    })
  })
})
