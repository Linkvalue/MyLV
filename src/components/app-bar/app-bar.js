import React from 'react'
import styles from './app-bar.scss'

console.log(styles)

export default () => (
  <div className={styles.appBar}>
    <h1 className={styles.brandName}>CraCra</h1>
  </div>
)
