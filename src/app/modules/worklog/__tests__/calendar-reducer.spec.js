import calendarReducer from '../calendar-reducer'
import { CALENDAR_SET_DATE } from '../calendar-actions'

jest.mock('moment', () => jest.fn(() => ({
  format: jest.fn(() => 'foo-bar-baz')
})))

describe('calendar/reducer', () => {
  describe('@@INIT', () => {
    it('should return initial state', () => {
      // When
      const state = calendarReducer(undefined, { type: '@@INIT' })

      // Then
      expect(state).toEqual({
        year: 'foo',
        month: 'bar',
        day: 'baz'
      })
    })
  })

  describe('SET_DATE', () => {
    it('should change current calendar date', () => {
      // Given
      const action = { type: CALENDAR_SET_DATE, payload: { date: 'hello-world-foo' } }

      // When
      const state = calendarReducer({}, action)

      // Then
      expect(state).toEqual({
        year: 'hello',
        month: 'world',
        day: 'foo'
      })
    })
  })
})
