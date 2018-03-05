import {
  LUNCH_DELETE_SUCCESS,
  LUNCHES_FETCH_DETAILS_ERROR,
  LUNCHES_FETCH_DETAILS_START,
  LUNCHES_FETCH_DETAILS_SUCCESS,
  PERSONAL_LUNCHES_FETCH_START,
  PERSONAL_LUNCHES_FETCH_SUCCESS,
  PERSONAL_LUNCHES_FETCH_ERROR,
} from './lunches.actions'

const initialState = {
  lunchesById: {},
  lunchesList: [],
  page: 1,
  pageCount: 1,
  isLoading: false,
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case PERSONAL_LUNCHES_FETCH_START:
      return {
        ...state,
        lunchesList: [],
        isLoading: true,
      }
    case PERSONAL_LUNCHES_FETCH_SUCCESS:
      return {
        ...state,
        lunchesById: payload.results.reduce((acc, lunch) => ({ ...acc, [lunch.id]: lunch }), {}),
        lunchesList: payload.results.map(lunch => lunch.id),
        page: payload.page,
        pageCount: payload.pageCount,
        isLoading: false,
      }
    case PERSONAL_LUNCHES_FETCH_ERROR:
      return {
        ...state,
        isLoading: false,
      }
    case LUNCHES_FETCH_DETAILS_START:
      return {
        ...state,
        isLoading: true,
      }
    case LUNCHES_FETCH_DETAILS_SUCCESS:
      return {
        ...state,
        lunchesById: {
          ...state.lunchesById,
          [payload.id]: { ...payload, attendees: payload.attendees.map(partner => partner.id) },
        },
        isLoading: false,
      }
    case LUNCHES_FETCH_DETAILS_ERROR:
      return {
        ...state,
        isLoading: false,
      }
    case LUNCH_DELETE_SUCCESS: {
      const { [payload.id]: deleted, ...remaining } = state.lunchesById
      return {
        ...state,
        lunchesById: remaining,
        lunchesList: state.lunchesList.filter(lunchId => lunchId !== deleted.id),
      }
    }
    default:
      return state
  }
}
