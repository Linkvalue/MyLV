import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { disableDesktopNotifications, enableDesktopNotifications } from '../push.service'
import { fetchWithAuth } from '../../auth/auth.actions'
import {
  DESKTOP_NOTIFICATIONS_INSTALLED,
  desktopNotificationsInstalled,
  TOGGLE_PROCESS_REMINDER,
  toggleProcessReminder,
  TOGGLE_PROOF_OF_TRANSPORT_DIALOG,
  toggleProofOfTransportDialog,
  TOGGLE_PUSH_NOTIFICATIONS,
  togglePushNotifications, togglePushNotificationSnack, TOGGLE_PUSH_NOTIFICATION_SNACK,
} from '../settings.actions'

jest.unmock('../settings.actions')

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('settings.actions', () => {
  describe('toggleProcessReminder', () => {
    it('should dispatch TOGGLE_PROCESS_REMINDER action with false by default', () => {
      // When
      const action = toggleProcessReminder()

      // Then
      expect(action).toEqual({ type: TOGGLE_PROCESS_REMINDER, payload: false })
    })

    it('should dispatch TOGGLE_PROCESS_REMINDER action with given state', () => {
      // When
      const action = toggleProcessReminder(true)

      // Then
      expect(action).toEqual({ type: TOGGLE_PROCESS_REMINDER, payload: true })
    })
  })

  describe('toggleProofOfTransportDialog', () => {
    it('should dispatch a TOGGLE_PROOF_OF_TRANSPORT_DIALOG action with false by default', () => {
      // When
      const action = toggleProofOfTransportDialog()

      // Then
      expect(action).toEqual({ type: TOGGLE_PROOF_OF_TRANSPORT_DIALOG, payload: false })
    })

    it('should dispatch a TOGGLE_PROOF_OF_TRANSPORT_DIALOG action with given state', () => {
      // When
      const action = toggleProofOfTransportDialog(true)

      // Then
      expect(action).toEqual({ type: TOGGLE_PROOF_OF_TRANSPORT_DIALOG, payload: true })
    })
  })

  describe('togglePushNotificationSnack', () => {
    it('should dispatch a TOGGLE_PUSH_NOTIFICATION_SNACK action with false by default', () => {
      // When
      const action = togglePushNotificationSnack()

      // Then
      expect(action).toEqual({ type: TOGGLE_PUSH_NOTIFICATION_SNACK, payload: false })
    })

    it('should dispatch a TOGGLE_PUSH_NOTIFICATION_SNACK action with given state', () => {
      // When
      const action = togglePushNotificationSnack(true)

      // Then
      expect(action).toEqual({ type: TOGGLE_PUSH_NOTIFICATION_SNACK, payload: true })
    })
  })

  describe('desktopNotificationsInstalled', () => {
    it('should dispatch a DESKTOP_NOTIFICATIONS_INSTALLED action with false by default', () => {
      // When
      const action = desktopNotificationsInstalled(true)

      // Then
      expect(action).toEqual({ type: DESKTOP_NOTIFICATIONS_INSTALLED, payload: { isSubscribed: true } })
    })
  })

  describe('togglePushNotifications', () => {
    it('should toggle off notifications and dispatch TOGGLE_PUSH_NOTIFICATIONS', async () => {
      // Given
      const store = mockStore({ settings: { desktopNotificationsEnabled: true, subscriptionId: 'foo' } })
      disableDesktopNotifications.mockImplementation(() => Promise.resolve())
      fetchWithAuth.mockImplementation(() => () => Promise.resolve())

      // When
      await store.dispatch(togglePushNotifications())

      // Then
      expect(store.getActions()).toEqual([{ type: TOGGLE_PUSH_NOTIFICATIONS, payload: { enabled: false, id: null } }])
    })

    it('should toggle off notifications and dispatch TOGGLE_PUSH_NOTIFICATIONS without sub id', async () => {
      // Given
      const store = mockStore({ settings: { desktopNotificationsEnabled: true } })
      disableDesktopNotifications.mockImplementation(() => Promise.resolve())
      fetchWithAuth.mockImplementation(() => () => Promise.resolve())

      // When
      await store.dispatch(togglePushNotifications())

      // Then
      expect(store.getActions()).toEqual([{ type: TOGGLE_PUSH_NOTIFICATIONS, payload: { enabled: false, id: null } }])
    })

    it('should toggle on notifications and dispatch TOGGLE_PUSH_NOTIFICATIONS', async () => {
      // Given
      const store = mockStore({ settings: { desktopNotificationsEnabled: false } })
      enableDesktopNotifications.mockImplementation(() => Promise.resolve())
      fetchWithAuth.mockImplementation(() => () => Promise.resolve({ id: 'foo' }))

      // When
      await store.dispatch(togglePushNotifications())

      // Then
      expect(store.getActions()).toEqual([{ type: TOGGLE_PUSH_NOTIFICATIONS, payload: { enabled: true, id: 'foo' } }])
    })
  })
})
