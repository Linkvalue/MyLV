import moment from 'moment'

import {
  WORKLOG_FILL_MORNING,
  WORKLOG_FILL_AFTERNOON,
  WORKLOG_FILL_DAY,
  WORKLOG_FILL_WEEK,
  WORKLOG_FILL_MONTH,
  WORKLOG_EMPTY_DAY,
  WORKLOG_ADD_LABEL
} from '../actions/worklog-actions'

const initialState = {
  entries: {},
  labels: {
    'Production': '#FF0000',
    'Contribution': '#00FF00',
    'Conges payes': '#0000FF',
    'Conges sans solde': '#FF00FF',
    'Maladie': '#FFFF00',
    'Autre': '#00FFFF'
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
      const startDate = moment(payload.day).startOf('week').subtract(1, 'day')
      return new Array(5)
        .fill(0)
        .reduce((s, v) => setDay(s, startDate.add(1, 'day').format('YYYY-MM-DD'), payload.label), state)
    case WORKLOG_FILL_MONTH:
      return new Array(moment(`${payload.month}-01`).daysInMonth())
        .fill(0)
        .map((v, i) => i + 1)
        .filter((v) => [0, 6].indexOf(moment(`${payload.month}-${`0${v}`.slice(-2)}`).day()) === -1)
        .reduce((s, v) => setDay(s, `${payload.month}-${`0${v}`.slice(-2)}`, payload.label), state)
    case WORKLOG_EMPTY_DAY:
      return setDay(state, payload.day)
    case WORKLOG_ADD_LABEL:
      return {
        ...state,
        labels: {
          ...state.labels,
          [payload.label]: payload.color
        }
      }
    default:
      return state
  }
}
