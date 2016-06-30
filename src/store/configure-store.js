import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { rootReducer } from './root-reducer'

export function configureStore (initialState, enhancers = []) {
  const storeEnhancers = [
    applyMiddleware(thunk),
    window.devToolsExtension && process.env.NODE_ENV !== 'production' ? window.devToolsExtension() : (f) => f
  ].concat(enhancers)

  return compose(...storeEnhancers)(createStore)(rootReducer, initialState)
}
