import React from 'react'
import { connect } from 'react-redux'

import AppBar from '../components/app-bar/app-bar'
import AppDrawer from '../components/app-drawer/app-drawer'

const mapStateToProps = (state) => ({
  awaitingLogin: state.auth.awaitingLogin
})

const App = ({ children, awaitingLogin }) => (
  <div className='mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header'>
    <AppBar />
    <AppDrawer />
    {awaitingLogin ? null : children}
  </div>
)

export default connect(mapStateToProps)(App)
