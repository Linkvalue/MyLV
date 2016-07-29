export const CALENDAR_SET_DATE = 'CALENDAR_SET_DATE'

export const setDate = (date) => ({
  type: CALENDAR_SET_DATE,
  payload: {date}
})
