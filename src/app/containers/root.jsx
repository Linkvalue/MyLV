import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { Switch, Route } from 'react-router-dom'

import AppBar from '../components/app-bar/app-bar'
import AppDrawer from '../components/app-drawer/app-drawer'
import ClientPage from '../modules/client/pages/client-page'
import WorklogPage from '../modules/worklog/pages/worklog-page/worklog-page'
import AuthCallbackPage from '../modules/auth/pages/auth-callback-page/auth-callback-page'
import LoginPage from '../modules/auth/pages/login-page/login-page'
import LoginRequired from '../modules/auth/components/login-required'

export const Root = ({ store, history }) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div className='mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header'>
        <AppBar />
        <AppDrawer />
        <Switch>
          <Route path='/auth' component={AuthCallbackPage} />
          <Route path='/login' component={LoginPage} />
          <Route path='/client' component={LoginRequired(ClientPage)} />
          <Route exact path='/' component={LoginRequired(WorklogPage)} />
        </Switch>
      </div>
    </ConnectedRouter>
  </Provider>
)

Root.propTypes = {
  history: PropTypes.object.isRequired,
  store: PropTypes.shape({
    subscribe: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    getState: PropTypes.func.isRequired
  }).isRequired
}
