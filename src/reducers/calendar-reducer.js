import moment from 'moment'

import { CALENDAR_SET_DATE } from '../actions/calendar-actions'

const currentDate = moment()

const initialState = {
  year: `${currentDate.year()}`,
  month: `0${currentDate.month() + 1}`.slice(-2),
  day: `0${currentDate.date()}`.slice(-2)
}

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case CALENDAR_SET_DATE:
      const [year, month, day] = payload.date.split('-')
      return {year, month, day}
    default:
      return state
  }
}
