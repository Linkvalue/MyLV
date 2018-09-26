import moment from 'moment'
import { createSelector } from 'reselect'

export const calendarYearSelector = state => state.calendar.year
export const calendarMonthSelector = state => state.calendar.month

export const worklogEntriesSelector = state => state.worklog.entries

export const calendarDaysSelector = createSelector(
  calendarYearSelector,
  calendarMonthSelector,
  (year, month) => {
    const m = moment(`${year}-${month}`, 'YYYY-MM')
    const weeks = []

    let w
    for (let i = 1; i <= m.daysInMonth(); i++) {
      const d = m.clone().date(i)
      if (!w || d.day() === 1) {
        w = Array.from({ length: 7 }, () => undefined)
        weeks.push(w)
      }
      w[(d.day() + 6) % 7] = `0${i}`.slice(-2)
    }

    return weeks
  },
)

export const calendarLabelsSelector = createSelector(
  worklogEntriesSelector,
  calendarYearSelector,
  calendarMonthSelector,
  (entries = {}, year, month) => {
    const dateRegExp = new RegExp(`^${year}-${month}`)
    const labelsSet = Object
      .keys(entries)
      .reduce((acc, date) => (entries[date] && dateRegExp.test(date) ? acc.add(entries[date]) : acc), new Set())
    return Array.from(labelsSet)
  },
)

export const calendarExpectedDaysSelector = createSelector(
  worklogEntriesSelector,
  calendarYearSelector,
  calendarMonthSelector,
  (entries = {}, year, month) => {
    const dateRegExp = new RegExp(`^${year}-${month}`)
    return Object.keys(entries).filter(i => entries[i] && dateRegExp.test(i)).length / 2
  },
)
