import React from 'react'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import App from './app'
import ClientPage from '../modules/client/pages/client-page'
import WorklogPage from '../modules/worklog/pages/worklog-page/worklog-page'
import AuthCallbackPage from '../modules/auth/pages/auth-callback-page/auth-callback-page'
import LoginPage from '../modules/auth/pages/login-page/login-page'
import LoginRequired from '../modules/auth/components/login-required'

export class Root extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.history = syncHistoryWithStore(browserHistory, this.props.store)
  }

  render () {
    return (
      <Provider store={this.props.store}>
        <Router history={this.history}>
          <Route path='/' component={App}>
            <Route path='auth' component={AuthCallbackPage} />
            <Route path='login' component={LoginPage} />
            <Route path='client' component={LoginRequired(ClientPage)} />
            <IndexRoute component={LoginRequired(WorklogPage)} />
          </Route>
        </Router>
      </Provider>
    )
  }
}

Root.propTypes = {
  children: React.PropTypes.arrayOf(React.PropTypes.element),
  store: React.PropTypes.shape({
    subscribe: React.PropTypes.func.isRequired,
    dispatch: React.PropTypes.func.isRequired,
    getState: React.PropTypes.func.isRequired
  })
}
