import React from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import styles from './app-bar.scss'
import { logout } from '../../modules/auth/auth-actions'

const mapStateToProps = (state) => ({
  user: state.auth.user
})

const mapDispatchToProps = (dispatch) => bindActionCreators({ logout }, dispatch)

const AppBar = ({ user, logout }) => {
  let userPart
  if (user) {
    userPart = (
      <span className={`mdl-navigation__link ${styles.appBarFullName}`}>
        {user.firstName} {user.lastName}
        <img className={styles.appBarAvatar} id='profile-button' src={user.profilePictureUrl} alt='Avatar' />
        <div className='mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect' htmlFor='profile-button'>
          <button className='mdl-menu__item' onClick={logout}>Logout</button>
        </div>
      </span>
    )
  }

  return (
    <header className={classNames('mdl-layout__header', styles.printHide)}>
      <div className='mdl-layout__header-row'>
        <div className='mdl-layout-spacer' />
        <nav className='mdl-navigation'>
          {userPart}
        </nav>
      </div>
    </header>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(AppBar)
