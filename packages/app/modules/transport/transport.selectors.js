import { createSelector } from 'reselect'

export const getPartnersTransportProofs = createSelector(
  state => state.transport.proofsById,
  state => state.transport.partnersProofs,
  (proofsById, partnersProofs) => partnersProofs.map(proofId => proofsById[proofId]),
)
