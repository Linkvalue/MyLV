import React from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'

import styles from './app-bar.scss'

const mapStateToProps = ({ user, routing }) => ({
  canPrint: user.firstName && user.lastName && user.clientName && user.clientAddress,
  showPrintButton: routing.location && routing.location.pathname === '/'
})

const AppBar = ({ canPrint, showPrintButton }) => (
  <header className={classNames('mdl-layout__header', styles.printHide)}>
    <div className='mdl-layout__header-row'>
      <span className='mdl-layout-title'>CraCra</span>
      <div className='mdl-layout-spacer' />
      <div className='mdl-navigation' style={{ display: showPrintButton ? 'block' : 'none' }}>
        <a
          href='#'
          className='mdl-navigation__link'
          disabled={!canPrint}
          onClick={() => canPrint ? window.print() : null}>
          Imprimer CRA
        </a>
      </div>
    </div>
  </header>
)

export default connect(mapStateToProps)(AppBar)
