import moment from 'moment'

import {
  WORKLOG_FILL_MORNING,
  WORKLOG_FILL_AFTERNOON,
  WORKLOG_FILL_DAY,
  WORKLOG_FILL_WEEK,
  WORKLOG_FILL_MONTH
} from '../actions/worklog-actions'

const initialState = {
  entries: {},
  labels: {
    production: '#FFEEEE',
    contribution: '#EEFFEE',
    paidLeave: '#EEEEFF',
    leaveWithoutPay: '#FFEEFF',
    ill: '#FFFFEE',
    other: '#EEFFFF'
  }
}

const setEntry = (state, date, label) => ({
  ...state,
  entries: {
    ...state.entries,
    [date]: label
  }
})

const setDay = (state, day, label) =>
  setEntry(setEntry(state, `${day}-am`, label), `${day}-pm`, label)

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case WORKLOG_FILL_MORNING:
      return setEntry(state, payload.date, payload.label)
    case WORKLOG_FILL_AFTERNOON:
      return setEntry(state, payload.date, payload.label)
    case WORKLOG_FILL_DAY:
      return setDay(state, payload.day, payload.label)
    case WORKLOG_FILL_WEEK:
      const startDate = moment(payload.day).startOf('week')
      return new Array(5)
        .fill(0)
        .reduce((s, v) => setDay(s, startDate.add(1, 'day').format('YYYY-MM-DD'), payload.label), state)
    case WORKLOG_FILL_MONTH:
      return new Array(moment(`${payload.month}-01`).daysInMonth())
        .fill(0)
        .map((v, i) => i + 1)
        .filter((v) => [0, 6].indexOf(moment(`${payload.month}-${`0${v}`.slice(-2)}`).day()) === -1)
        .reduce((s, v) => setDay(s, `${payload.month}-${`0${v}`.slice(-2)}`, payload.label), state)
    default:
      return state
  }
}
