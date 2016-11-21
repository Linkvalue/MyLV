import React from 'react'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import { App } from './app'
import UserPage from '../views/user-page'
import WorklogPage from '../views/worklog-page'

export class Root extends React.Component {
  render () {
    return (
      <Provider store={this.props.store}>
        <Router history={browserHistory}>
          <Route path='/' component={App}>
            <Route path='user' component={UserPage} />
            <IndexRoute component={WorklogPage} />
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
