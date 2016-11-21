import React from 'react'
import { connect } from 'react-redux'

import styles from './app-bar.scss'

const mapStateToProps = (state) => ({
  canPrint: state.user.firstName && state.user.lastName
})

const AppBar = ({ canPrint }) => (
  <header className={styles.appBar}>
    <div className={styles.appBarRow}>
      <span className={styles.brandName}>CraCra</span>
      <div className={styles.appBarSpacer}></div>
      <div className={styles.appBarNavigation}>
        <a
          href='#'
          className={styles.printButton}
          disabled={!canPrint}
          onClick={() => canPrint ? window.print() : null}>
          Imprimer CRA
        </a>
      </div>
    </div>
  </header>
)

export default connect(mapStateToProps)(AppBar)
