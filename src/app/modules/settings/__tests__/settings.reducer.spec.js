import { REHYDRATE } from 'redux-persist/constants'

import settingsReducer from '../settings.reducer'
import {
  DESKTOP_NOTIFICATIONS_INSTALLED, TOGGLE_HOLIDAYS_DISCLAIMER, TOGGLE_PROCESS_REMINDER,
  SAVE_PREFERENCES_SUCCESS, TOGGLE_PUSH_NOTIFICATION_SNACK, TOGGLE_PUSH_NOTIFICATIONS,
} from '../settings.actions'

jest.unmock('redux-persist/constants')
jest.unmock('../settings.reducer')
jest.unmock('../settings.actions')

describe('settings.reducer', () => {
  it('should handle TOGGLE_PROCESS_REMINDER', () => {
    // Given
    const action = { type: TOGGLE_PROCESS_REMINDER, payload: true }

    // When
    const state = settingsReducer({}, action)

    // Then
    expect(state).toEqual({
      shouldRemindProcess: true,
    })
  })

  it('should handle SAVE_PREFERENCES_SUCCESS', () => {
    // Given
    const action = { type: SAVE_PREFERENCES_SUCCESS, payload: { hasProofOfTransport: true } }

    // When
    const state = settingsReducer({}, action)

    // Then
    expect(state).toEqual({
      shouldDisplayProofOfTransportDialog: true,
    })
  })

  it('should handle TOGGLE_PUSH_NOTIFICATION_SNACK', () => {
    // Given
    const action = { type: TOGGLE_PUSH_NOTIFICATION_SNACK, payload: true }

    // When
    const state = settingsReducer({}, action)

    // Then
    expect(state).toEqual({
      shouldDisplayPushNotificationSnack: true,
    })
  })

  it('should handle DESKTOP_NOTIFICATIONS_INSTALLED', () => {
    // Given
    const action = { type: DESKTOP_NOTIFICATIONS_INSTALLED, payload: { isSubscribed: true } }

    // When
    const state = settingsReducer({}, action)

    // Then
    expect(state).toEqual({
      desktopNotificationsEnabled: true,
      desktopNotificationsInstalled: true,
    })
  })

  it('should handle TOGGLE_PUSH_NOTIFICATIONS', () => {
    // Given
    const action = { type: TOGGLE_PUSH_NOTIFICATIONS, payload: { enabled: true, id: 'foo' } }

    // When
    const state = settingsReducer({}, action)

    // Then
    expect(state).toEqual({
      shouldDisplayPushNotificationSnack: false,
      desktopNotificationsEnabled: true,
      subscriptionId: 'foo',
    })
  })

  it('should handle REHYDRATE', () => {
    // Given
    const action = { type: REHYDRATE, payload: { settings: { foo: 'bar' } } }

    // When
    const state = settingsReducer({
      baz: 'qux',
      desktopNotificationsEnabled: false,
      desktopNotificationsInstalled: true,
    }, action)

    // Then
    expect(state).toEqual({
      desktopNotificationsEnabled: false,
      desktopNotificationsInstalled: true,
      foo: 'bar',
      baz: 'qux',
      rehydrated: true,
    })
  })

  it('should handle TOGGLE_HOLIDAYS_DISCLAIMER', () => {
    // Given
    const action = { type: TOGGLE_HOLIDAYS_DISCLAIMER, payload: true }

    // When
    const state = settingsReducer({ foo: 'bar' }, action)

    // Then
    expect(state).toEqual({
      shouldDisplayHolidaysDisclaimer: true,
      foo: 'bar',
    })
  })
})
