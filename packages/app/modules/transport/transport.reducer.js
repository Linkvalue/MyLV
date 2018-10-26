import moment from 'moment'

import {
  TRANSPORT_UPLOAD_PROOF_SUCCESS,
  TRANSPORT_PROOFS_FETCH_START,
  TRANSPORT_PROOFS_FETCH_SUCCESS,
  TRANSPORT_PROOFS_FETCH_ERROR,
  TRANSPORT_PROOF_DELETE_SUCCESS,
} from './transport.actions'

const initialState = {
  expirationDate: 0,
  proofsById: {},
  partnersProofs: [],
  isPartnersProofsLoading: false,
  limit: 25,
  pageCount: 0,
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case TRANSPORT_UPLOAD_PROOF_SUCCESS:
      return {
        ...state,
        expirationDate: Number(moment(payload.expirationDate).format('x')),
      }
    case TRANSPORT_PROOFS_FETCH_START:
      return {
        ...state,
        partnersProofs: [],
        isPartnersProofsLoading: true,
        limit: payload.limit || state.limit,
      }
    case TRANSPORT_PROOFS_FETCH_SUCCESS:
      return {
        ...state,
        proofsById: {
          ...state.proofsById,
          ...payload.results.reduce((acc, proof) => ({ ...acc, [proof.id]: proof }), {}),
        },
        partnersProofs: payload.results.map(proof => proof.id),
        isPartnersProofsLoading: false,
        pageCount: payload.pageCount,
      }
    case TRANSPORT_PROOFS_FETCH_ERROR:
      return {
        ...state,
        isPartnersProofsLoading: false,
      }
    case TRANSPORT_PROOF_DELETE_SUCCESS: {
      const { [payload.id]: deletedProof, ...remainingProofsById } = state.proofsById
      return {
        ...state,
        partnersProofs: state.partnersProofs.filter(proofId => proofId !== payload.id),
        proofsById: remainingProofsById,
      }
    }
    default:
      return state
  }
}
