import React from 'react'
import classnames from 'classnames'

import styles from './login-page.scss'

const redirectUri = `${window.location.protocol}//${window.location.host}/auth`
const loginUrl = `${process.env.lvConnectEndpoint}&redirect_uri=${redirectUri}`

const handleLoginButtonClick = () => {
  window.open(loginUrl, 'LVConnect', 'width=500,height=500')
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
