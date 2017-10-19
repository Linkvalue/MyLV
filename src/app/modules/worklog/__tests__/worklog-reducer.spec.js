import worklogReducer from '../worklog-reducer'
import {
  WORKLOG_EMPTY_DAY,
  WORKLOG_FILL_AFTERNOON,
  WORKLOG_FILL_DAY,
  WORKLOG_FILL_MONTH,
  WORKLOG_FILL_MORNING,
  WORKLOG_FILL_WEEK,
  WORKLOG_SAVE_SUCCESS
} from '../worklog-actions'

jest.unmock('../worklog-reducer')
jest.unmock('../worklog-actions')

jest.mock('../calendar-constants')
jest.mock('moment', () => jest.fn((stringDate) => {
  let counter = 0
  const momentMock = {
    startOf: jest.fn(() => momentMock),
    subtract: jest.fn(() => momentMock),
    add: jest.fn(() => {
      counter += 1
      return momentMock
    }),
    format: jest.fn(() => `foo-${counter}`),
    daysInMonth: jest.fn(() => 30),
    day: jest.fn(() => Number(stringDate.slice(-2)) % 7)
  }
  return momentMock
}))

describe('worklog/reducer', () => {
  describe('WORKLOG_FILL_MORNING', () => {
    it('should fill morning entry with given label', () => {
      // Given
      const action = { type: WORKLOG_FILL_MORNING, payload: { date: 'hello', label: 'world' } }

      // When
      const state = worklogReducer({ entries: { foo: 'bar' } }, action)

      // Then
      expect(state).toEqual({
        entries: {
          foo: 'bar',
          'hello-am': 'world'
        },
        pending: {
          'hello-am': 'world'
        }
      })
    })
  })

  describe('WORKLOG_FILL_AFTERNOON', () => {
    it('should fill afternoon entry with given label', () => {
      // Given
      const action = { type: WORKLOG_FILL_AFTERNOON, payload: { date: 'hello', label: 'world' } }

      // When
      const state = worklogReducer({ entries: {} }, action)

      // Then
      expect(state).toEqual({ entries: { 'hello-pm': 'world' }, pending: { 'hello-pm': 'world' } })
    })
  })

  describe('WORKLOG_FILL_DAY', () => {
    it('should fill entry with given label', () => {
      // Given
      const action = { type: WORKLOG_FILL_DAY, payload: { day: 'hello', label: 'world' } }

      // When
      const state = worklogReducer({ entries: {} }, action)

      // Then
      expect(state).toEqual({
        entries: { 'hello-am': 'world', 'hello-pm': 'world' },
        pending: { 'hello-am': 'world', 'hello-pm': 'world' }
      })
    })
  })

  describe('WORKLOG_FILL_WEEK', () => {
    it('should fill an entry for each day of the week with given label', () => {
      // Given
      const action = { type: WORKLOG_FILL_WEEK, payload: { day: 'hello', label: 'world' } }

      // When
      const state = worklogReducer({ entries: {} }, action)

      // Then
      expect(state).toMatchSnapshot()
    })
  })

  describe('WORKLOG_FILL_MONTH', () => {
    it('should fill an entry for each working day of the month with given label', () => {
      // Given
      const action = { type: WORKLOG_FILL_MONTH, payload: { month: '0000-00', label: 'world' } }

      // When
      const state = worklogReducer({ entries: {} }, action)

      // Then
      expect(state).toMatchSnapshot()
    })
  })

  describe('WORKLOG_EMPTY_DAY', () => {
    it('should empty given entry date', () => {
      // Given
      const action = { type: WORKLOG_EMPTY_DAY, payload: { day: 'foo' } }

      // When
      const state = worklogReducer({ entries: { 'foo-am': 'bar', 'foo-pm': 'bar' } }, action)

      // Then
      expect(state).toEqual({
        entries: { 'foo-am': undefined, 'foo-pm': undefined },
        pending: { 'foo-am': null, 'foo-pm': null }
      })
    })
  })

  describe('WORKLOG_SAVE_SUCCESS', () => {
    it('should empty pending changes', () => {
      // Given
      const action = { type: WORKLOG_SAVE_SUCCESS }

      // When
      const state = worklogReducer({ pending: { 'foo-am': 'bar', 'foo-pm': 'bar' } }, action)

      // Then
      expect(state).toEqual({ pending: {} })
    })
  })
})
