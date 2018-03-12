import moment from 'moment'

import { publicHolidays } from '../../../shared/calendar-constants'

export const formatPeriod = ({
  _id,
  startOnPM,
  endOnPM,
  ...period
}) => ({
  ...period,
  startDate: startOnPM ? moment(period.startDate).hour(11).toISOString() : moment(period.startDate).toISOString(),
  endDate: endOnPM ? moment(period.endDate).hour(23).toISOString() : moment(period.endDate).hour(11).toISOString(),
})

const millisecondsInDay = 1000 * 60 * 60 * 24

export const getPeriodDayCount = (period) => {
  const startDate = moment(period.startDate)
  const endDate = moment(period.endDate)
  let days = Math.round((endDate.diff(startDate) / millisecondsInDay) * 2) / 2
  if (days < 0) {
    return 0
  }
  while (startDate.format('YYYY-MM-DD') !== endDate.format('YYYY-MM-DD')) {
    const month = `0${startDate.month() + 1}`.slice(-2)
    const day = `0${startDate.date()}`.slice(-2)
    if (startDate.day() >= 5 || publicHolidays.has(`${month}-${day}`)) {
      days -= 1
    }
    startDate.add(1, 'd')
  }
  return days
}

export const getDaysForLabel = (periods, key, shouldFormat = true) => periods
  .filter(period => period.label === key)
  .map(shouldFormat ? formatPeriod : period => period)
  .reduce((sum, period) => sum + getPeriodDayCount(period), 0)
