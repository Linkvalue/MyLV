export const WORKLOG_FILL_MORNING = 'WORKLOG_FILL_MORNING'
export const WORKLOG_FILL_AFTERNOON = 'WORKLOG_FILL_AFTERNOON'
export const WORKLOG_FILL_DAY = 'WORKLOG_FILL_DAY'
export const WORKLOG_FILL_WEEK = 'WORKLOG_FILL_WEEK'
export const WORKLOG_FILL_MONTH = 'WORKLOG_FILL_MONTH'

export const fillMorning = (date, label) => ({
  type: WORKLOG_FILL_MORNING,
  payload: {date, label}
})

export const fillAfternoon = (date, label) => ({
  type: WORKLOG_FILL_AFTERNOON,
  payload: {date, label}
})

export const fillDay = (day, label) => ({
  type: WORKLOG_FILL_DAY,
  payload: {day, label}
})

export const fillWeek = (year, week, label) => ({
  type: WORKLOG_FILL_WEEK,
  payload: {year, week, label}
})

export const fillMonth = (month, label) => ({
  type: WORKLOG_FILL_MONTH,
  payload: {month, label}
})
