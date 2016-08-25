import React from 'react'
import { connect } from 'react-redux'

import styles from './app-bar.scss'

const mapStateToProps = (state) => ({
  canPrint: state.user.firstName && state.user.lastName
})

const AppBar = ({ canPrint }) => (
  <div className={styles.appBar}>
    <h1 className={styles.brandName}>CraCra</h1>
    <button
      className={styles.printButton}
      disabled={!canPrint}
      onClick={() => canPrint ? window.print() : null}>
      Imprimer CRA
    </button>
  </div>
)

export default connect(mapStateToProps)(AppBar)
