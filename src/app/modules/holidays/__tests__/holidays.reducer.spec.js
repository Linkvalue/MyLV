import {
  HOLIDAY_DELETE_SUCCESS, HOLIDAYS_FETCH_ERROR, HOLIDAYS_FETCH_START, HOLIDAYS_FETCH_SUCCESS,
  PERSONAL_HOLIDAYS_FETCH_ERROR,
  PERSONAL_HOLIDAYS_FETCH_START,
  PERSONAL_HOLIDAYS_FETCH_SUCCESS,
} from '../holidays.actions'
import holidaysReducer from '../holidays.reducer'

jest.unmock('../holidays.actions')
jest.unmock('../holidays.reducer')

describe('holidays.reducer', () => {
  it('should handle PERSONAL_HOLIDAYS_FETCH_START action', () => {
    // Given
    const action = { type: PERSONAL_HOLIDAYS_FETCH_START }

    // When
    const state = holidaysReducer({ personalHolidays: ['foo'] }, action)

    // Then
    expect(state).toEqual({
      personalHolidays: [],
      isPersonalLoading: true,
    })
  })

  it('should handle PERSONAL_HOLIDAYS_FETCH_SUCCESS action', () => {
    // Given
    const action = { type: PERSONAL_HOLIDAYS_FETCH_SUCCESS, payload: { results: [{ id: 'foo' }] } }

    // When
    const state = holidaysReducer({ personalHolidays: [], isPersonalLoading: true }, action)

    // Then
    expect(state).toEqual({
      holidaysById: {
        foo: { id: 'foo' },
      },
      personalHolidays: ['foo'],
      isPersonalLoading: false,
    })
  })

  it('should handle PERSONAL_HOLIDAYS_FETCH_ERROR action', () => {
    // Given
    const action = { type: PERSONAL_HOLIDAYS_FETCH_ERROR }

    // When
    const state = holidaysReducer({ isPersonalLoading: true }, action)

    // Then
    expect(state).toEqual({ isPersonalLoading: false })
  })

  it('should handle HOLIDAY_DELETE_SUCCESS action', () => {
    // Given
    const action = { type: HOLIDAY_DELETE_SUCCESS, payload: { id: 'foo' } }

    // When
    const state = holidaysReducer({
      holidaysById: { foo: { id: 'foo' }, bar: { id: 'bar' } },
      personalHolidays: ['foo', 'bar'],
    }, action)

    // Then
    expect(state).toEqual({
      holidaysById: { bar: { id: 'bar' } },
      personalHolidays: ['bar'],
    })
  })

  it('should handle HOLIDAYS_FETCH_START action', () => {
    // Given
    const action = { type: HOLIDAYS_FETCH_START, payload: { limit: 100 } }

    // When
    const state = holidaysReducer({ partnersHolidays: ['foo'] }, action)

    // Then
    expect(state).toEqual({
      isPartnersHolidaysLoading: true,
      limit: 100,
      partnersHolidays: [],
    })
  })

  it('should handle HOLIDAYS_FETCH_SUCCESS action', () => {
    // Given
    const action = { type: HOLIDAYS_FETCH_SUCCESS, payload: { results: [{ id: 'foo' }] } }

    // When
    const state = holidaysReducer({ partnersHolidays: [], isPartnersHolidaysLoading: true }, action)

    // Then
    expect(state).toEqual({
      holidaysById: {
        foo: { id: 'foo' },
      },
      partnersHolidays: ['foo'],
      isPartnersHolidaysLoading: false,
    })
  })

  it('should handle HOLIDAYS_FETCH_ERROR action', () => {
    // Given
    const action = { type: HOLIDAYS_FETCH_ERROR }

    // When
    const state = holidaysReducer({ isPartnersHolidaysLoading: true }, action)

    // Then
    expect(state).toEqual({ isPartnersHolidaysLoading: false })
  })
})
