import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { initialize } from 'redux-form'
import { routerMiddleware } from 'react-router-redux'
import { persistStore, autoRehydrate } from 'redux-persist'
import { browserHistory } from 'react-router'

import { rootReducer } from './root-reducer'
import { fetchUserData } from '../modules/auth/auth-actions'

export function configureStore () {
  const storeEnhancers = [
    autoRehydrate(),
    applyMiddleware(thunk, routerMiddleware(browserHistory)),
    window.devToolsExtension && process.env.NODE_ENV !== 'production' ? window.devToolsExtension() : (f) => f
  ]

  const store = compose(...storeEnhancers)(createStore)(rootReducer)
  persistStore(store, {
    blacklist: ['calendar', 'routing', 'form']
  }, () => {
    const state = store.getState()
    store.dispatch(initialize('clientForm', state.client))

    store.dispatch(fetchUserData())
      .catch(() => {})
  })

  return store
}
