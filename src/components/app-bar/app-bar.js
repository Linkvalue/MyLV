import React from 'react'

import styles from './app-bar.scss'

export default () => (
  <div className={styles.appBar}>
    <h1 className={styles.brandName}>CraCra</h1>
    <button
      className={styles.printButton}
      onClick={() => window.print()}>
      Imprimer CRA
    </button>
  </div>
)
