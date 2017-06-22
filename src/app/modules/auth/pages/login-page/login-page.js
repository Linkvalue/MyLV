import React, { Component } from 'react'
import classnames from 'classnames'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import styles from './login-page.scss'
import { login } from '../../auth-actions'

const mapDispatchToProps = (dispatch) => bindActionCreators({
  login
}, dispatch)

class LoginPage extends Component {
  constructor (props, context) {
    super(props, context)

    this.state = {
      error: false
    }

    this.handleLoginButtonClick = this.handleLoginButtonClick.bind(this)
  }

  handleLoginButtonClick () {
    this.setState({ error: false })
    this.props.login()
      .catch(() => this.setState({ error: true }))
  }

  render () {
    return (
      <div className={`mdl-layout__content ${styles.loginPage}`}>
        <button
          className={classnames(styles.loginButton, 'mdl-js-button', 'mdl-js-ripple-effect')}
          onClick={this.handleLoginButtonClick}>
          <img
            className={styles.loginButtonLogo}
            src='/assets/images/logo/logo96x96.png'
            alt='Logo LinkValue'
          />
          Login with LVConnect
        </button>
        {this.state.error ? <div className={styles.loginError}>An error occurred during login</div> : null}
      </div>
    )
  }
}

export default connect(undefined, mapDispatchToProps)(LoginPage)
