import React from 'react'
import classNames from 'classnames'

import styles from './app-bar.scss'

export default () => (
  <header className={classNames('mdl-layout__header', styles.printHide)}>
    <div className='mdl-layout__header-row'>
      <span className='mdl-layout-title'>CraCra</span>
    </div>
  </header>
)
