import moment from 'moment'
import memoize from 'lodash/memoize'

export const calendarDaysSelector = memoize((year, month) => {
  const m = moment(`${year}-${month}`, 'YYYY-MM')
  const weeks = []

  let w
  for (let i = 1; i <= m.daysInMonth(); i++) {
    let d = m.clone().date(i)
    if (!w || d.day() === 1) {
      w = Array.from({ length: 7 }, () => undefined)
      weeks.push(w)
    }
    w[(d.day() + 6) % 7] = `0${i}`.slice(-2)
  }

  return weeks
}, (year, month) => `${year}-${month}`)

export const calendarLabelsSelector = memoize((entries, year, month) => {
  const m = moment(`${year}-${month}`, 'YYYY-MM')
  const labelsInLegend = {}

  for (let i = 1; i <= m.daysInMonth(); i++) {
    const morning = entries[`${year}-${month}-${`0${i}`.slice(-2)}-am`]
    if (morning) {
      labelsInLegend[morning] = true
    }
    const afternoon = entries[`${year}-${month}-${`0${i}`.slice(-2)}-pm`]
    if (afternoon) {
      labelsInLegend[afternoon] = true
    }
  }

  return labelsInLegend
})
