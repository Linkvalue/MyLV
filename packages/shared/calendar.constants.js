const moment = require('moment')

function easterDate(year = (new Date()).getFullYear()) {
  // Golden Number - 1
  const G = year % 19
  const C = Math.floor(year / 100)
  // related to Epact
  const H = ((C - Math.floor(C / 4) - Math.floor(((8 * C) + 13) / 25)) + (19 * G) + 15) % 30
  // number of days from 21 March to the Paschal full moon
  const I = H - (Math.floor(H / 28) * (1 - (Math.floor(29 / (H + 1)) * Math.floor((21 - G) / 11))))
  // weekday for the Paschal full moon
  const J = (year + Math.floor(year / 4) + I + (2 - C) + Math.floor(C / 4)) % 7
  // number of days from 21 March to the Sunday on or before the Paschal full moon
  const L = I - J
  const easterMonth = 3 + Math.floor((L + 40) / 44)
  const easterDay = (L + 28) - (31 * Math.floor(easterMonth / 4))

  return new Date(Date.UTC(year, easterMonth - 1, easterDay))
}

exports.easterDate = easterDate

exports.publicHolidays = new Set([
  '01-01',
  moment(easterDate()).add(1, 'days').format('MM-DD'), // Easter Monday
  '05-01',
  '05-08',
  moment(easterDate()).add(39, 'days').format('MM-DD'), // Assumption
  '07-14',
  '08-15',
  '11-01',
  '12-25',
])

const holidayLabelsObject = {
  paidHolidays: 'Congés payés',
  unpaidHolidays: 'Congés sans solde',
  conventionalHolidays: 'Absences Syntec',
}

exports.holidayLabels = new Map(Object.entries(holidayLabelsObject))

exports.labels = new Map(Object.entries({
  production: 'Production',
  ...holidayLabelsObject,
  contributions: 'Contributions',
  conferences: 'Conférences',
  sickness: 'Arrêt Maladie',
}))

exports.labelColors = new Map(Object.entries({
  production: '#ff9999',
  contributions: '#99ff99',
  conferences: '#ffcc99',
  paidHolidays: '#9999ff',
  unpaidHolidays: '#ff99ff',
  conventionalHolidays: '#99ffff',
}))
