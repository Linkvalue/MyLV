import { REHYDRATE } from 'redux-persist/constants'
import {
  TOGGLE_PROCESS_REMINDER,
  TOGGLE_PROOF_OF_TRANSPORT_DIALOG,
  DESKTOP_NOTIFICATIONS_INSTALLED,
  TOGGLE_PUSH_NOTIFICATIONS,
  TOGGLE_PUSH_NOTIFICATION_SNACK,
  TOGGLE_HOLIDAYS_DISCLAIMER,
  TOGGLE_TUTORIALS,
} from './settings.actions'

const initialState = {
  shouldRemindProcess: true,
  shouldDisplayHolidaysDisclaimer: true,
  shouldDisplayProofOfTransportDialog: true,
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
    case TOGGLE_PROOF_OF_TRANSPORT_DIALOG:
      return {
        ...state,
        shouldDisplayProofOfTransportDialog: payload,
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
    case REHYDRATE:
      return {
        ...state,
        ...payload.settings,
        desktopNotificationsEnabled: state.desktopNotificationsEnabled,
        desktopNotificationsInstalled: state.desktopNotificationsInstalled,
        rehydrated: true,
      }
    default:
      return state
  }
}
