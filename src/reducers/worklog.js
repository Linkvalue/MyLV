import {
  WORKLOG_FILL_MORNING,
  WORKLOG_FILL_AFTERNOON,
  WORKLOG_FILL_DAY,
  WORKLOG_FILL_WEEK,
  WORKLOG_FILL_MONTH
} from '../actions/worklog-actions'

const initialState = {
  entries: {}
}

const setEntry = (state, date, label) => ({
  ...state,
  entries: {
    ...state.entries,
    [date]: label
  }
})

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case WORKLOG_FILL_MORNING:
      return setEntry(state, payload.date, payload.label)
    case WORKLOG_FILL_AFTERNOON:
      return setEntry(state, payload.date, payload.label)
    case WORKLOG_FILL_DAY:
      return state
    case WORKLOG_FILL_WEEK:
      return state
    case WORKLOG_FILL_MONTH:
      return state
    default:
      return state
  }
}
