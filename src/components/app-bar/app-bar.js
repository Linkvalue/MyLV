import React from 'react'

import GenerateDoc from '../generate-doc/generate-doc'
import styles from './app-bar.scss'

export default () => (
  <div className={styles.appBar}>
    <h1 className={styles.brandName}>CraCra</h1>
    <GenerateDoc />
  </div>
)
