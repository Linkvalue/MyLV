exports.publicHolidays = new Set([
  '01-01',
  '04-02',
  '05-01',
  '05-08',
  '05-10',
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
  contribution: '#99ff99',
  conferences: '#ffcc99',
  paidHolidays: '#9999ff',
  unpaidHolidays: '#ff99ff',
  conventionalHolidays: '#99ffff',
}))
