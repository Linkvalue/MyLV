import {
  LUNCHES_FETCH_DETAILS_ERROR, LUNCHES_FETCH_DETAILS_START, LUNCHES_FETCH_DETAILS_SUCCESS,
  LUNCHES_FETCH_SUCCESS
} from './lunches.actions'

const initialState = {
  lunchesById: {},
  lunchesList: [],
  page: 1,
  pageCount: 1,
  isLoading: false
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case LUNCHES_FETCH_SUCCESS:
      return {
        ...state,
        lunchesById: payload.results.reduce((acc, lunch) => ({ ...acc, [lunch.id]: lunch }), {}),
        lunchesList: payload.results.map(lunch => lunch.id),
        page: payload.page,
        pageCount: payload.pageCount
      }
    case LUNCHES_FETCH_DETAILS_START:
      return {
        ...state,
        isLoading: true
      }
    case LUNCHES_FETCH_DETAILS_SUCCESS:
      return {
        ...state,
        lunchesById: {
          ...state.lunchesById,
          [payload.id]: { ...payload, attendants: payload.attendants.map(partner => partner.id) }
        },
        isLoading: false
      }
    case LUNCHES_FETCH_DETAILS_ERROR:
      return {
        ...state,
        isLoading: false
      }
    default:
      return state
  }
}