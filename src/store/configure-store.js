import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { initialize } from 'redux-form'
import { browserHistory } from 'react-router'
import { syncHistory, routeActions } from 'redux-simple-router'
import { persistStore, autoRehydrate } from 'redux-persist'

import { rootReducer } from './root-reducer'
import { canPrintSelector } from '../selectors/user-selectors'

export function configureStore () {
  const reduxRouterMiddleware = syncHistory(browserHistory)

  const storeEnhancers = [
    autoRehydrate(),
    applyMiddleware(reduxRouterMiddleware, thunk),
    window.devToolsExtension && process.env.NODE_ENV !== 'production' ? window.devToolsExtension() : (f) => f
  ]

  const store = compose(...storeEnhancers)(createStore)(rootReducer)
  persistStore(store, {
    blacklist: ['calendar', 'routing', 'form']
  }, () => {
    const state = store.getState()
    store.dispatch(initialize('userForm', state.user))

    if (!canPrintSelector(state)) {
      store.dispatch(routeActions.push('/user'))
    }
  })

  return store
}
