import { createSelector } from 'reselect'

export const getPersonalHolidays = createSelector(
  state => state.holidays.holidaysById,
  state => state.holidays.personalHolidays,
  (holidaysById, personalHolidays) => personalHolidays.map(holidayId => holidaysById[holidayId]),
)

export const getPartnersHolidays = createSelector(
  state => state.holidays.holidaysById,
  state => state.holidays.partnersHolidays,
  (holidaysById, partnersHolidays) => partnersHolidays.map(holidayId => holidaysById[holidayId]),
)
