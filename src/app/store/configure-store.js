import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { initialize } from 'redux-form'
import { routerMiddleware } from 'react-router-redux'
import { persistStore, autoRehydrate } from 'redux-persist'
import { createBrowserHistory } from 'history'

import { rootReducer } from './root-reducer'
import { fetchUserData } from '../modules/auth/auth.actions'

export const browserHistory = createBrowserHistory()

export function configureStore() {
  const storeEnhancers = [
    autoRehydrate(),
    applyMiddleware(thunk, routerMiddleware(browserHistory)),
  ]

  const isProd = process.env.NODE_ENV !== 'production'
  const composeEnhancers = (isProd && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose
  const store = composeEnhancers(...storeEnhancers)(createStore)(rootReducer)
  persistStore(store, {
    blacklist: ['calendar', 'routing', 'form'],
  }, () => {
    const state = store.getState()
    store.dispatch(initialize('clientForm', state.client))

    store.dispatch(fetchUserData())
      .catch(() => {})
  })

  return store
}
