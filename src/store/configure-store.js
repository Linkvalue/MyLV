import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import {persistStore, autoRehydrate} from 'redux-persist'

import { rootReducer } from './root-reducer'

export function configureStore () {
  const storeEnhancers = [
    autoRehydrate(),
    applyMiddleware(thunk),
    window.devToolsExtension && process.env.NODE_ENV !== 'production' ? window.devToolsExtension() : (f) => f
  ]

  const store = compose(...storeEnhancers)(createStore)(rootReducer)
  persistStore(store)
  return store
}
