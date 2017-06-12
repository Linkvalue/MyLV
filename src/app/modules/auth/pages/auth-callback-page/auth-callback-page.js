import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import styles from './auth-callback-page.scss'
import { authenticateFromCode, fetchUserData } from '../../auth-actions'

const mapDispatchToProps = (dispatch) => bindActionCreators({
  authenticateFromCode,
  fetchUserData
}, dispatch)

class AuthCallbackPage extends React.Component {
  constructor (props, context) {
    super(props, context)

    this.state = {
      error: false
    }
  }

  componentDidMount () {
    if (!this.props.location.query.code) {
      this.setState({
        error: true
      })
      return
    }

    this.props.authenticateFromCode(this.props.location.query.code)
      .then((res) => {
        console.log(res)
        if (window.opener && window.opener.loginDone) {
          window.opener.loginDone(res)
          window.close()
        }
      })
      .catch(() => {
        this.setState({
          error: true
        })
      })
  }

  render () {
    if (this.state.error) {
      return (
        <div className={`mdl-layout__content ${styles.errorContainer}`}>
          <svg className={styles.errorIcon} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 510 510'>
            <path d='M255 0C114.75 0 0 114.75 0 255s114.75 255 255 255 255-114.75 255-255S395.25 0 255 0zm25.5 382.5h-51v-51h51v51zm0-102h-51v-153h51v153z' />
          </svg>
          <div className={styles.errorText}>
            Sorry, something went wrong during authentication :(
          </div>
        </div>
      )
    }

    return null
  }
}

export default connect(undefined, mapDispatchToProps)(AuthCallbackPage)
