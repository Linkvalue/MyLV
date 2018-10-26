const moment = require('moment')

const { publicHolidays } = require('@cracra/shared/calendar.constants')

module.exports = function getWorkingDays(date) {
  let days = 0
  for (let i = 1; i <= moment(date, 'YYYY-MM').daysInMonth(); i++) {
    const d = moment(date, 'YYYY-MM').date(i)
    if (d.day() !== 0 && d.day() !== 6 && !publicHolidays.has(d.format('MM-DD'))) {
      days += 1
    }
  }

  return days
}
