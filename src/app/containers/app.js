import React from 'react'

import AppBar from '../components/app-bar/app-bar'
import AppDrawer from '../components/app-drawer/app-drawer'

const App = ({ children, awaitingLogin }) => (
  <div className='mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header'>
    <AppBar />
    <AppDrawer />
    {children}
  </div>
)

export default App
