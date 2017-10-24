import { STOP_PROCESS_REMINDER, DISABLE_PROOF_OF_TRANSPORT_DIALOG } from './settings-actions'

const initialState = {
  shouldRemindProcess: true,
  shouldDisplayProofOfTransportDialog: true,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case STOP_PROCESS_REMINDER:
      return {
        ...state,
        shouldRemindProcess: false,
      }
    case DISABLE_PROOF_OF_TRANSPORT_DIALOG:
      return {
        ...state,
        shouldDisplayProofOfTransportDialog: false,
      }
    default:
      return state
  }
}
