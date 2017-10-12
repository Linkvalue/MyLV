import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

const mapStateToProps = (state) => ({
  isConnected: !!state.auth.user,
  awaitingLogin: state.auth.awaitingLogin
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  push
}, dispatch)

const LoginRequired = (WrappedComponent) => {
  class AuthWrapper extends React.Component {
    componentWillReceiveProps (props) {
      if (!props.isConnected && !props.awaitingLogin) {
        this.props.push('/login')
      }
    }

    render () {
      if (!this.props.isConnected || this.props.awaitingLogin) {
        return null
      }

      return <WrappedComponent {...this.props} />
    }
  }
  AuthWrapper.displayName = `AuthWrapper(${WrappedComponent.displayName})`
  return connect(mapStateToProps, mapDispatchToProps)(AuthWrapper)
}

export default LoginRequired
