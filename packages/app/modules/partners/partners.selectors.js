import { createSelector } from 'reselect'

const getPartnersById = state => state.partners.partnersById

export const getPartnersSearchResults = createSelector(
  getPartnersById,
  state => state.partners.partnersSearchResults,
  (partnersById, partnersSearchResults) => partnersSearchResults.map(partnerId => partnersById[partnerId]),
)

export const getPartnersList = createSelector(
  getPartnersById,
  state => state.partners.partnersList,
  (partnersById, partnersList) => partnersList.map(partnerId => partnersById[partnerId]),
)
