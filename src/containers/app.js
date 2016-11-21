import React from 'react'
import classNames from 'classnames'

import AppBar from '../components/app-bar/app-bar'
import AppDrawer from '../components/app-drawer/app-drawer'

export const App = (props) => (
  <div className={classNames('mdl-layout', 'mdl-js-layout', 'mdl-layout--fixed-header')}>
    <AppBar />
    <AppDrawer />
    {props.children}
  </div>
)
