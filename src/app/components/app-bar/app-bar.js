import React from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'

import styles from './app-bar.scss'

const mapStateToProps = (state) => ({
  user: state.auth.user
})

const AppBar = ({ user }) => {
  let userPart
  if (user) {
    userPart = (
      <span className={`mdl-navigation__link ${styles.appBarFullName}`}>
        {user.firstName} {user.lastName}
        <img className={styles.appBarAvatar} src={user.profilePictureUrl} alt='Avatar' />
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

export default connect(mapStateToProps)(AppBar)
