import { STOP_PROCESS_REMINDER } from './settings-actions'

const initialState = {
  shouldRemindProcess: true
}

export default (state = initialState, action) => {
  switch (action.type) {
    case STOP_PROCESS_REMINDER:
      return {
        ...state,
        shouldRemindProcess: false
      }
    default:
      return state
  }
}
