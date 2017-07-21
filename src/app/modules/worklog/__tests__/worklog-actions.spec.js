import {
  fillMorning,
  WORKLOG_FILL_MORNING,
  fillAfternoon,
  WORKLOG_FILL_AFTERNOON,
  fillDay,
  WORKLOG_FILL_DAY,
  fillWeek,
  WORKLOG_FILL_WEEK,
  fillMonth,
  WORKLOG_FILL_MONTH,
  fillRange,
  WORKLOG_FILL_RANGE,
  emptyDay,
  WORKLOG_EMPTY_DAY,
  addLabel,
  WORKLOG_ADD_LABEL,
  saveWorklog,
  WORKLOG_SAVE_SUCCESS
} from '../worklog-actions'

jest.mock('../../auth/auth-actions', () => ({ fetchWithAuth: jest.fn((url, options) => ({ url, options })) }))

jest.unmock('../worklog-actions')

describe('worklog/actions', () => {
  describe('fillMorning()', () => {
    it('should return WORKLOG_FILL_MORNING action', () => {
      // When
      const action = fillMorning('foo-bar-baz', 'qux')

      // Then
      expect(action).toEqual({
        type: WORKLOG_FILL_MORNING,
        payload: {
          date: 'foo-bar-baz',
          label: 'qux'
        }
      })
    })
  })

  describe('fillAfternoon()', () => {
    it('should return WORKLOG_FILL_AFTERNOON action', () => {
      // When
      const action = fillAfternoon('foo-bar-baz', 'qux')

      // Then
      expect(action).toEqual({
        type: WORKLOG_FILL_AFTERNOON,
        payload: {
          date: 'foo-bar-baz',
          label: 'qux'
        }
      })
    })
  })

  describe('fillDay()', () => {
    it('should return WORKLOG_FILL_DAY action', () => {
      // When
      const action = fillDay('foo-bar-baz', 'qux')

      // Then
      expect(action).toEqual({
        type: WORKLOG_FILL_DAY,
        payload: {
          day: 'foo-bar-baz',
          label: 'qux'
        }
      })
    })
  })

  describe('fillWeek()', () => {
    it('should return WORKLOG_FILL_WEEK action', () => {
      // When
      const action = fillWeek('foo-bar-baz', 'qux')

      // Then
      expect(action).toEqual({
        type: WORKLOG_FILL_WEEK,
        payload: {
          day: 'foo-bar-baz',
          label: 'qux'
        }
      })
    })
  })

  describe('fillMonth()', () => {
    it('should return WORKLOG_FILL_MONTH action', () => {
      // When
      const action = fillMonth('foo-bar-baz', 'qux')

      // Then
      expect(action).toEqual({
        type: WORKLOG_FILL_MONTH,
        payload: {
          month: 'foo-bar-baz',
          label: 'qux'
        }
      })
    })
  })

  describe('fillRange()', () => {
    it('should return WORKLOG_FILL_RANGE action', () => {
      // When
      const action = fillRange('foo-bar-baz', 'hello-world-qux', 'blah')

      // Then
      expect(action).toEqual({
        type: WORKLOG_FILL_RANGE,
        payload: {
          start: 'foo-bar-baz',
          end: 'hello-world-qux',
          label: 'blah'
        }
      })
    })
  })

  describe('emptyDay()', () => {
    it('should return WORKLOG_EMPTY_DAY action', () => {
      // When
      const action = emptyDay('foo-bar-baz')

      // Then
      expect(action).toEqual({
        type: WORKLOG_EMPTY_DAY,
        payload: {
          day: 'foo-bar-baz'
        }
      })
    })
  })

  describe('addLabel()', () => {
    it('should return WORKLOG_FILL_MONTH action', () => {
      // When
      const action = addLabel('foo-bar-baz', '#00FF00')

      // Then
      expect(action).toEqual({
        type: WORKLOG_ADD_LABEL,
        payload: {
          label: 'foo-bar-baz',
          color: '#00FF00'
        }
      })
    })
  })

  describe('saveWorklog()', () => {
    it('should dispatch an api action then a save success action', async () => {
      // Given
      expect.assertions(2)
      const dispatch = jest.fn(() => Promise.resolve())
      const getState = jest.fn(() => ({ worklog: { pending: { foo: 'bar' } } }))

      // When
      await saveWorklog()(dispatch, getState)

      // Then
      expect(dispatch).toHaveBeenCalledWith({
        url: '/api/worklog',
        options: {
          method: 'PUT',
          body: '[{"date":"foo","label":"bar"}]'
        }
      })
      expect(dispatch).toHaveBeenCalledWith({ type: WORKLOG_SAVE_SUCCESS })
    })
  })
})
