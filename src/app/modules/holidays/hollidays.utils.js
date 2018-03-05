import moment from 'moment/moment'

export const formatPeriod = ({
  _id,
  startOnPM,
  endOnPM,
  ...period
}) => ({
  ...period,
  startDate: startOnPM ? moment(period.startDate).hour(11).toISOString() : moment(period.startDate).toISOString(),
  endDate: endOnPM ? moment(period.endDate).hour(23).toISOString() : moment(period.endDate).hour(11).toISOString(),
})

const millisecondsInDay = 1000 * 60 * 60 * 24
export const getDaysForLabel = (periods, key, shouldFormat = true) => {
  const days = periods
    .filter(period => period.label === key)
    .map(shouldFormat ? formatPeriod : period => period)
    .reduce((sum, period) =>
      sum + (moment(period.endDate).diff(moment(period.startDate)) / millisecondsInDay), 0)
  return Math.round(days * 2) / 2
}
