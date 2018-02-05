import { saveWorklog, WORKLOG_SAVE_SUCCESS } from '../worklog-actions'

jest.mock('../../auth/auth.actions', () => ({ fetchWithAuth: jest.fn((url, options) => ({ url, options })) }))

jest.unmock('../worklog-actions')

describe('worklog/actions', () => {
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
          body: [{date: 'foo', label: 'bar'}],
        },
      })
      expect(dispatch).toHaveBeenCalledWith({ type: WORKLOG_SAVE_SUCCESS })
    })
  })

  it('should dispatch presave action if present', async () => {
    // Given
    expect.assertions(1)
    const dispatch = jest.fn(() => Promise.resolve())
    const getState = jest.fn(() => ({ worklog: { pending: {} } }))

    // When
    await saveWorklog({ type: 'yolo' })(dispatch, getState)

    // Then
    expect(dispatch).toHaveBeenCalledWith({ type: 'yolo' })
  })
})
