import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'

import styles from './login-page.scss'
import { lvConnect } from '../../lvconnect'

const mapStateToProps = (state) => ({
  isConnected: !!state.auth.user,
  error: state.auth.error,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  push,
}, dispatch)

class LoginPage extends Component {
  componentDidMount () {
    lvConnect.mountLoginButton(this.loginButtonContainer)
  }

  componentWillReceiveProps (props) {
    if (props.isConnected) {
      this.props.push('/')
    }
  }

  render () {
    return (
      <div className={`mdl-layout__content ${styles.loginPage}`}>
        <div ref={el => { this.loginButtonContainer = el }} />
        {this.props.error ? <div className={styles.loginError}>An error occurred during login</div> : null}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
