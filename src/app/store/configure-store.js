import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { initialize } from 'redux-form'
import { routerMiddleware, LOCATION_CHANGE } from 'react-router-redux'
import { persistStore, autoRehydrate } from 'redux-persist'
import { createBrowserHistory } from 'history'
import qs from 'qs'

import { rootReducer } from './root-reducer'
import { fetchUserData } from '../modules/auth/auth.actions'

export const browserHistory = createBrowserHistory()

const gaMiddleware = () => next => (action) => {
  if (action.type === LOCATION_CHANGE) {
    window.gtag('config', 'UA-120362624-1', { page_path: action.payload.pathname })
  }
  return next(action)
}

export function configureStore() {
  const storeEnhancers = [
    autoRehydrate(),
    applyMiddleware(thunk, routerMiddleware(browserHistory), gaMiddleware),
  ]

  const isProd = process.env.NODE_ENV === 'production'
  const debugEnabled = qs.parse(window.location.search).debug
  const composeEnhancers = ((!isProd || debugEnabled) && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose
  const store = composeEnhancers(...storeEnhancers)(createStore)(rootReducer)
  persistStore(store, {
    blacklist: ['calendar', 'routing', 'form', 'display', 'transport'],
  }, () => {
    const state = store.getState()
    store.dispatch(initialize('clientForm', state.client))

    store.dispatch(fetchUserData())
      .catch(() => {})
  })

  return store
}
