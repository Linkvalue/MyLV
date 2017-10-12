import { DETECT_DEVICE, detectDevice } from './display.actions'

const initialState = detectDevice().payload

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case DETECT_DEVICE:
      return { ...state, ...payload }
    default:
      return state
  }
}
