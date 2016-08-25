import moment from 'moment'

import { CALENDAR_SET_DATE } from '../actions/calendar-actions'

const [year, month, day] = moment().format('YYYY-MM-DD').split('-')

const initialState = { year, month, day }

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case CALENDAR_SET_DATE:
      const [year, month, day] = payload.date.split('-')
      return { year, month, day }
    default:
      return state
  }
}
