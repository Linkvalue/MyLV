import { disableDesktopNotifications, enableDesktopNotifications } from './push.service'
import { fetchWithAuth, fetchUserData } from '../auth/auth.actions'

export const TOGGLE_PROCESS_REMINDER = 'TOGGLE_PROCESS_REMINDER'
export const toggleProcessReminder = (toggle = false) => ({ type: TOGGLE_PROCESS_REMINDER, payload: toggle })

export const TOGGLE_PROOF_OF_TRANSPORT_DIALOG = 'TOGGLE_PROOF_OF_TRANSPORT_DIALOG'
export const toggleProofOfTransportDialog = (toggle = false) => ({
  type: TOGGLE_PROOF_OF_TRANSPORT_DIALOG,
  payload: toggle,
})

export const TOGGLE_PUSH_NOTIFICATION_SNACK = 'TOGGLE_PUSH_NOTIFICATION_SNACK'
export const togglePushNotificationSnack = (toggle = false) => ({
  type: TOGGLE_PUSH_NOTIFICATION_SNACK,
  payload: toggle,
})

export const TOGGLE_PUSH_NOTIFICATIONS = 'TOGGLE_PUSH_NOTIFICATIONS'
export const togglePushNotifications = () => (dispatch, getState) => {
  const state = getState()
  const { subscriptionId, desktopNotificationsEnabled: isSubscribed } = state.settings

  if (isSubscribed) {
    return disableDesktopNotifications()
      .then(() => {
        if (!subscriptionId) {
          return Promise.resolve()
        }
        return dispatch(fetchWithAuth(`/api/subscriptions/${subscriptionId}`, { method: 'DELETE' }))
      })
      .then(() => dispatch({ type: TOGGLE_PUSH_NOTIFICATIONS, payload: { enabled: false, id: null } }))
  }

  return enableDesktopNotifications()
    .then(subscription => dispatch(fetchWithAuth('/api/subscriptions', { method: 'POST', body: subscription })))
    .then(({ id }) => dispatch({ type: TOGGLE_PUSH_NOTIFICATIONS, payload: { enabled: true, id } }))
    .catch(e => console.error(e))
}

export const DESKTOP_NOTIFICATIONS_INSTALLED = 'DESKTOP_NOTIFICATIONS_INSTALLED'
export const desktopNotificationsInstalled = isSubscribed => ({
  type: DESKTOP_NOTIFICATIONS_INSTALLED,
  payload: { isSubscribed },
})

export const TOGGLE_HOLIDAYS_DISCLAIMER = 'TOGGLE_HOLIDAYS_DISCLAIMER'
export const toggleHolidaysDisclaimer = (value = false) => ({
  type: TOGGLE_HOLIDAYS_DISCLAIMER,
  payload: value,
})

export const TOGGLE_TUTORIALS = 'TOGGLE_TUTORIALS'
export const toggleTutorials = (value = false) => ({
  type: TOGGLE_TUTORIALS,
  payload: value,
})

export const SAVE_PREFERENCES_START = 'SAVE_PREFERENCES_START'
export const SAVE_PREFERENCES_SUCCESS = 'SAVE_PREFERENCES_SUCCESS'
export const SAVE_PREFERENCES_ERROR = 'SAVE_PREFERENCES_ERROR'
export const savePreferences = changes => async (dispatch) => {
  dispatch({ type: SAVE_PREFERENCES_START })

  try {
    const profile = await dispatch(fetchWithAuth('/api/profile/me', { method: 'PUT', body: changes }))

    // Reload user data with latest proof of transport
    if (changes.hasProofOfTransport) {
      await dispatch(fetchUserData())
    }

    dispatch({ type: SAVE_PREFERENCES_SUCCESS, payload: profile })
  } catch (e) {
    dispatch({ type: SAVE_PREFERENCES_ERROR, payload: e })
  }
}
