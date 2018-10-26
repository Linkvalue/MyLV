import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import LoadingPage from '../../../components/loadingPage.component'

const mapStateToProps = state => ({
  isConnected: !!state.auth.user,
  awaitingLogin: state.auth.awaitingLogin,
  isOffline: state.display.isOffline,
})

const LoginRequired = ({
  awaitingLogin,
  isConnected,
  isOffline,
  location,
  children,
}) => {
  if (awaitingLogin) {
    return <LoadingPage />
  }

  if (!isConnected && !isOffline) {
    return (
      <Redirect
        to={{
          pathname: '/login',
          state: { from: location },
        }}
      />
    )
  }

  return (
    <React.Fragment>
      {children}
    </React.Fragment>
  )
}

LoginRequired.propTypes = {
  awaitingLogin: PropTypes.bool.isRequired,
  isConnected: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
}

export default connect(mapStateToProps)(LoginRequired)
