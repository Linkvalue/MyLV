import { PARTNERS_CLEAR_SEARCH, PARTNERS_FETCH_SEARCH_SUCCESS, PARTNERS_FETCH_SUCCESS } from './partners.actions'

const initialState = {
  partnersById: {},
  partnersSearchResults: []
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case PARTNERS_FETCH_SEARCH_SUCCESS:
      return {
        ...state,
        partnersById: {
          ...state.partnersById,
          ...payload.results.reduce((acc, partner) => ({ ...acc, [partner.id]: partner }), {})
        },
        partnersSearchResults: payload.results.map(partner => partner.id)
      }
    case PARTNERS_CLEAR_SEARCH:
      return {
        ...state,
        partnersSearchResults: []
      }
    case PARTNERS_FETCH_SUCCESS:
      return {
        ...state,
        partnersById: {
          ...state.partnersById,
          ...payload.results.reduce((acc, partner) => ({ ...acc, [partner.id]: partner }), {})
        }
      }
    default:
      return state
  }
}
