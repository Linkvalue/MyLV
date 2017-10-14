import { createSelector } from 'reselect'

export const getPartnersSearchResults = createSelector(
  state => state.partners.partnersById,
  state => state.partners.partnersSearchResults,
  (partnersById, partnersSearchResults) => partnersSearchResults.map(partnerId => partnersById[partnerId])
)
