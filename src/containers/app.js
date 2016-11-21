import React from 'react'
import classNames from 'classnames'

import AppBar from '../components/app-bar/app-bar'
import AppDrawer from '../components/app-drawer/app-drawer'
import styles from './app.scss'

export const App = (props) => (
  <div className={classNames('mdl-layout', 'mdl-js-layout', 'mdl-layout--fixed-header')}>
    <AppBar className={styles.printHide} />
    <AppDrawer className={styles.printHide} />
    {props.children}
  </div>
)
