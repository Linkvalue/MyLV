import { hasPendingChangesSelector } from '../worklog-selectors'

jest.unmock('../worklog-selectors')

describe('worklog/selectors', () => {
  describe('hasPendingChangesSelector()', () => {
    it('should return true if has pending changes', () => {
      // Given
      const state = { worklog: { pending: { foo: 'bar' } } }

      // When
      const hasChanges = hasPendingChangesSelector(state)

      // Then
      expect(hasChanges).toBeTruthy()
    })

    it('should return false if no pending changes', () => {
      // Given
      const state = { worklog: { pending: {} } }

      // When
      const hasChanges = hasPendingChangesSelector(state)

      // Then
      expect(hasChanges).toBeFalsy()
    })
  })
})
