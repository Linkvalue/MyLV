const moment = require('moment')

const { publicHolidays } = require('./calendar.constants')

const formatPeriod = ({
  _id,
  startOnPM,
  endOnPM,
  ...period
}) => ({
  ...period,
  startDate: startOnPM ? moment(period.startDate).hour(12).toISOString() : moment(period.startDate).toISOString(),
  endDate: endOnPM ? moment(period.endDate).hour(23).toISOString() : moment(period.endDate).hour(12).toISOString(),
})

const millisecondsInDay = 1000 * 60 * 60 * 24

const getPeriodDayCount = (period) => {
  const startDate = moment(period.startDate)
  const endDate = moment(period.endDate)
  let days = Math.round((endDate.diff(startDate) / millisecondsInDay) * 2) / 2
  if (days <= 0 || !startDate.isValid() || !endDate.isValid()) {
    return 0
  }
  while (startDate.format('YYYY-MM-DD') !== endDate.format('YYYY-MM-DD')) {
    const month = `0${startDate.month() + 1}`.slice(-2)
    const day = `0${startDate.date()}`.slice(-2)
    if (startDate.day() === 0 || startDate.day() === 6 || publicHolidays.has(`${month}-${day}`)) {
      days -= 1
    }
    startDate.add(1, 'd')
  }
  return days
}

const getDaysForLabel = (periods, key, shouldFormat = true) => periods
  .filter(period => period.label === key)
  .map(shouldFormat ? formatPeriod : period => period)
  .reduce((sum, period) => sum + getPeriodDayCount(period), 0)

exports.formatPeriod = formatPeriod
exports.getPeriodDayCount = getPeriodDayCount
exports.getDaysForLabel = getDaysForLabel
