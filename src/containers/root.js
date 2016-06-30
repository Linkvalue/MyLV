import React from 'react'
import { Provider } from 'react-redux'

import { App } from './app'

export class Root extends React.Component {
  render () {
    return (
      <Provider store={this.props.store}>
        <App/>
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
