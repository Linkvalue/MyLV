import {
  PARTNERS_CLEAR_SEARCH, PARTNERS_FETCH_ERROR, PARTNERS_FETCH_SEARCH_SUCCESS, PARTNERS_FETCH_START,
  PARTNERS_FETCH_SUCCESS
} from './partners.actions'

const initialState = {
  partnersById: {},
  partnersSearchResults: [],
  partnersList: [],
  isLoading: false,
  limit: 25,
  pageCount: 0
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
    case PARTNERS_FETCH_START:
      return {
        ...state,
        partnersList: [],
        isLoading: true,
        limit: payload.limit
      }
    case PARTNERS_FETCH_SUCCESS:
      return {
        ...state,
        partnersById: {
          ...state.partnersById,
          ...payload.results.reduce((acc, partner) => ({ ...acc, [partner.id]: partner }), {})
        },
        partnersList: payload.results.map(partner => partner.id),
        isLoading: false,
        pageCount: payload.pageCount
      }
    case PARTNERS_FETCH_ERROR:
      return {
        ...state,
        isLoading: false
      }
    default:
      return state
  }
}
