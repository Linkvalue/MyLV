import { DETECT_DEVICE, detectDevice, SWITCH_OFFLINE_MODE } from './display.actions'

const initialState = {
  ...detectDevice().payload,
  isOffline: false,
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
    default:
      return state
  }
}
