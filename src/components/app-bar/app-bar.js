import React from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'

import styles from './app-bar.scss'

const mapStateToProps = ({ user }) => ({
  canPrint: user.firstName && user.lastName && user.clientName && user.clientAddress
})

const AppBar = ({ canPrint }) => (
  <header className={classNames('mdl-layout__header', styles.printHide)}>
    <div className='mdl-layout__header-row'>
      <span className='mdl-layout-title'>CraCra</span>
      <div className='mdl-layout-spacer' />
      <div className='mdl-navigation mdl-layout--large-screen-only'>
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
