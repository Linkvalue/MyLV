import React from 'react'
import classnames from 'classnames'

import styles from './login-page.scss'

const appId = 'b27c3d4c-889d-4601-b1b5-939ad9bbcb63'
const redirectUri = `${window.location.protocol}//${window.location.host}/auth`
const loginUrl = `https://lvconnect.link-value.fr/oauth/authorize?app_id=${appId}&redirect_uri=${redirectUri}`

const handleLoginButtonClick = () => {
  window.open(loginUrl)
}

const LoginPage = () => (
  <div className={`mdl-layout__content ${styles.loginPage}`}>
    <button
      className={classnames(styles.loginButton, 'mdl-js-button', 'mdl-js-ripple-effect')}
      onClick={handleLoginButtonClick}>
      <img
        className={styles.loginButtonLogo}
        src='/assets/images/logo/logo96x96.png'
        alt='Logo LinkValue'
      />
      Login with LVConnect
    </button>
  </div>
)

export default LoginPage
