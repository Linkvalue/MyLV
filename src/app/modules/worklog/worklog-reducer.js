import moment from 'moment'
import { REHYDRATE } from 'redux-persist/constants'

import { publicHolidays } from '../../../shared/calendar-constants'
import {
  WORKLOG_FILL_MORNING,
  WORKLOG_FILL_AFTERNOON,
  WORKLOG_FILL_DAY,
  WORKLOG_FILL_WEEK,
  WORKLOG_FILL_MONTH,
  WORKLOG_EMPTY_DAY,
  WORKLOG_ADD_LABEL,
  WORKLOG_SAVE_SUCCESS, WORKLOG_GET_START, WORKLOG_GET_SUCCESS,
} from './worklog-actions'

const initialState = {
  isLoading: false,
  error: false,
  entries: {},
  pending: {},
  labels: {
    Production: '#ff9999',
    Contribution: '#99ff99',
    Conferences: '#ffcc99',
    'Conges payes': '#9999ff',
    'Conges sans solde': '#ff99ff',
    Maladie: '#ffff99',
    'Absences Syntec': '#99ffff',
  },
}

const setEntry = (state, date, label) => ({
  ...state,
  entries: {
    ...state.entries,
    [date]: label,
  },
  pending: state.entries[date] === label ? state.pending : {
    ...state.pending,
    [date]: label || null,
  },
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
    case WORKLOG_FILL_WEEK: {
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
    }
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
          [payload.label]: payload.color,
        },
      }
    case WORKLOG_GET_START:
      return {
        ...state,
        entries: {},
        error: false,
        isLoading: true,
      }
    case WORKLOG_GET_SUCCESS:
      return {
        ...state,
        entries: payload.reduce((entries, entry) => ({ ...entries, [entry.date]: entry.label }), {}),
        isLoading: false,
      }
    case WORKLOG_SAVE_SUCCESS:
      return {
        ...state,
        pending: {},
      }
    case REHYDRATE:
      return {
        ...state,
        entries: payload.worklog.entries,
      }
    default:
      return state
  }
}
