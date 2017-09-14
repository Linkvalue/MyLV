import React from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import styles from './app-drawer.scss'
import { canPrintSelector } from '../../modules/client/client-selectors'

const mapStateToProps = (state) => ({
  isConnected: !!state.auth.user,
  canPrint: canPrintSelector(state)
})

const AppDrawer = ({ canPrint, isConnected }) => (
  <div className={classNames('mdl-layout__drawer', styles.printHide)}>
    <span className='mdl-layout-title'>CraCra</span>
    <nav className='mdl-navigation'>
      {isConnected ? <Link className='mdl-navigation__link' to='/client'>Client</Link> : null}
      {isConnected && canPrint ? <Link className='mdl-navigation__link' to='/'>Remplir son CRA</Link> : null}
    </nav>
  </div>
)

export default connect(mapStateToProps)(AppDrawer)
