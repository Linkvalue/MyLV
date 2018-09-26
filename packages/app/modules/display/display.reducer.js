import {
  DETECT_DEVICE,
  detectDevice,
  SWITCH_OFFLINE_MODE,
  DISSMISS_ALERT,
  DISPLAY_NEXT_ALERT,
  PUSH_ALERT,
} from './display.actions'

const initialState = {
  ...detectDevice().payload,
  isOffline: false,
  alerts: {
    open: false,
    current: undefined,
    queue: [],
  },
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case DETECT_DEVICE:
      return { ...state, ...payload }
    case SWITCH_OFFLINE_MODE:
      return {
        ...state,
        isOffline: payload.value,
      }
    case PUSH_ALERT:
      return {
        ...state,
        alerts: {
          ...state.alerts,
          open: state.alerts.queue.length === 0,
          current: state.alerts.queue.length === 0 ? payload : null,
          queue: state.alerts.queue.length === 0 ? state.alerts.queue : [...state.alerts.queue, payload],
        },
      }
    case DISSMISS_ALERT:
      return {
        ...state,
        alerts: {
          ...state.alerts,
          open: false,
        },
      }
    case DISPLAY_NEXT_ALERT:
      return {
        ...state,
        alerts: {
          ...state.alerts,
          open: state.alerts.queue.length > 0,
          current: state.alerts.queue[state.alerts.queue.length - 1],
          queue: state.alerts.queue.slice(0, -1),
        },
      }
    default:
      return state
  }
}
