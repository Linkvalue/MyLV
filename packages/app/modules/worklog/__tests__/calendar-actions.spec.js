import { CALENDAR_SET_DATE, setDate } from '../calendar-actions'

jest.unmock('../calendar-actions')

describe('calendar/actions', () => {
  describe('setDate()', () => {
    it('should return SET_DATE action', () => {
      // When
      const action = setDate('foo')

      // Then
      expect(action).toEqual({
        type: CALENDAR_SET_DATE,
        payload: { date: 'foo' },
      })
    })
  })
})
