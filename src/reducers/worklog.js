import {
  WORKLOG_EDIT_ENTRY
} from '../actions/worklog-actions'

const initialState = {
  entries: {}
}

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case WORKLOG_EDIT_ENTRY:
      return {
        ...state,
        entries: {
          ...state.entries,
          [payload.date]: {
            ...state.entries[payload.date] || {},
            [payload.label]: payload.worked
          }
        }
      }
    default:
      return state
  }
}
