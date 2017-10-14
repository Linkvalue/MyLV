import { createSelector } from 'reselect'

export const getLunches = createSelector(
  state => state.lunches.lunchesById,
  state => state.lunches.lunchesList,
  (lunchesById, lunchesSearchResults) => lunchesSearchResults.map(lunchId => lunchesById[lunchId])
)
