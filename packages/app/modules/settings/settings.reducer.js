import { REHYDRATE } from 'redux-persist/constants'
import {
  TOGGLE_PROCESS_REMINDER,
  DESKTOP_NOTIFICATIONS_INSTALLED,
  TOGGLE_PUSH_NOTIFICATIONS,
  TOGGLE_PUSH_NOTIFICATION_SNACK,
  TOGGLE_HOLIDAYS_DISCLAIMER,
  TOGGLE_TUTORIALS,
  SAVE_PREFERENCES_SUCCESS,
} from './settings.actions'
import { RECEIVE_USER_DATA } from '../auth/auth.actions'

const initialState = {
  shouldRemindProcess: true,
  shouldDisplayHolidaysDisclaimer: true,
  shouldDisplayProofOfTransportDialog: false,
  shouldDisplayPushNotificationSnack: true,
  desktopNotificationsEnabled: false,
  desktopNotificationsInstalled: false,
  subscriptionId: null,
  rehydrated: false,
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case TOGGLE_PROCESS_REMINDER:
      return {
        ...state,
        shouldRemindProcess: payload,
      }
    case SAVE_PREFERENCES_SUCCESS:
      return {
        ...state,
        shouldDisplayProofOfTransportDialog: payload.hasProofOfTransport,
      }
    case DESKTOP_NOTIFICATIONS_INSTALLED:
      return {
        ...state,
        desktopNotificationsInstalled: true,
        desktopNotificationsEnabled: payload.isSubscribed,
      }
    case TOGGLE_PUSH_NOTIFICATIONS:
      return {
        ...state,
        desktopNotificationsEnabled: payload.enabled,
        subscriptionId: payload.id,
        shouldDisplayPushNotificationSnack: false,
      }
    case TOGGLE_PUSH_NOTIFICATION_SNACK:
      return {
        ...state,
        shouldDisplayPushNotificationSnack: payload,
      }
    case TOGGLE_HOLIDAYS_DISCLAIMER:
      return {
        ...state,
        shouldDisplayHolidaysDisclaimer: payload,
      }
    case TOGGLE_TUTORIALS:
      return {
        ...state,
        shouldDisplayHolidaysDisclaimer: payload,
        shouldRemindProcess: payload,
      }
    case RECEIVE_USER_DATA:
      return {
        ...state,
        shouldDisplayProofOfTransportDialog: payload.profile.hasProofOfTransport,
      }
    case REHYDRATE:
      return {
        ...state,
        ...payload.settings,
        shouldDisplayProofOfTransportDialog: state.shouldDisplayProofOfTransportDialog,
        desktopNotificationsEnabled: state.desktopNotificationsEnabled,
        desktopNotificationsInstalled: state.desktopNotificationsInstalled,
        rehydrated: true,
      }
    default:
      return state
  }
}
