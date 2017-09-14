import moment from 'moment'

import { publicHolidays } from './calendar-constants'
import {
  WORKLOG_FILL_MORNING,
  WORKLOG_FILL_AFTERNOON,
  WORKLOG_FILL_DAY,
  WORKLOG_FILL_WEEK,
  WORKLOG_FILL_MONTH,
  WORKLOG_EMPTY_DAY,
  WORKLOG_ADD_LABEL,
  WORKLOG_SAVE_SUCCESS
} from './worklog-actions'

const initialState = {
  entries: {},
  pending: {},
  labels: {
    'Production': '#ff9999',
    'Contribution': '#99ff99',
    'Conges payes': '#9999ff',
    'Conges sans solde': '#ff99ff',
    'Maladie': '#ffff99',
    'Autre': '#99ffff'
  }
}

const setEntry = (state, date, label) => ({
  ...state,
  entries: {
    ...state.entries,
    [date]: label
  },
  pending: {
    ...state.pending,
    [date]: label
  }
})

const setDay = (state, day, label) =>
  setEntry(setEntry(state, `${day}-am`, label), `${day}-pm`, label)

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case WORKLOG_FILL_MORNING:
      return setEntry(state, `${payload.date}-am`, payload.label)
    case WORKLOG_FILL_AFTERNOON:
      return setEntry(state, `${payload.date}-pm`, payload.label)
    case WORKLOG_FILL_DAY:
      return setDay(state, payload.day, payload.label)
    case WORKLOG_FILL_WEEK:
      const startDate = moment(payload.day).startOf('week').subtract(1, 'day')
      return new Array(5)
        .fill(0)
        .reduce((s) => {
          startDate.add(1, 'day')
          if (publicHolidays.has(startDate.format('MM-DD'))) {
            return s
          }
          return setDay(s, startDate.format('YYYY-MM-DD'), payload.label)
        }, state)
    case WORKLOG_FILL_MONTH:
      return new Array(moment(`${payload.month}-01`).daysInMonth())
        .fill(0)
        .map((v, i) => i + 1)
        .filter((v) => {
          const stringDate = `${payload.month}-${`0${v}`.slice(-2)}`
          return [0, 6].indexOf(moment(stringDate).day()) === -1 && !publicHolidays.has(stringDate.slice(5))
        })
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
    case WORKLOG_SAVE_SUCCESS:
      return {
        ...state,
        pending: {}
      }
    default:
      return state
  }
}
