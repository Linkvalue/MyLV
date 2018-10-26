const moment = require('moment')

const { publicHolidays } = require('./calendar.constants')

function isDayOff(date) {
  return moment(date).isoWeekday() > 5 || publicHolidays.has(moment(date).format('MM-DD'))
}

exports.isDayOff = isDayOff
