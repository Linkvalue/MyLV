import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Drawer, Divider, List, withStyles } from 'material-ui'
import {BeachAccess, Person, Event, Restaurant, SupervisorAccount} from 'material-ui-icons'

import { canPrintSelector } from '../modules/client/client-selectors'
import AppDrawerItem from './appDrawerItem.component'
import config from '../config'

export const drawerWidth = 240

const styles = theme => ({
  drawerPaper: {
    position: 'relative',
    height: '100%',
    width: drawerWidth,
  },
  drawerHeader: theme.mixins.toolbar,
  '@media print': {
    drawerPaper: {
      display: 'none',
    },
  },
})

const mapStateToProps = (state) => ({
  isConnected: !!state.auth.user,
  user: state.auth.user,
  canPrint: canPrintSelector(state),
  shouldCollapseDrawer: state.display.isMobile || state.display.isTablet,
})

const AppDrawer = ({ user, classes, open, canPrint, isConnected, shouldCollapseDrawer, onDrawerClose }) => {
  const links = []
  if (isConnected) {
    links.push(<AppDrawerItem to='/client' icon={<Person />} text='Client' key='client' />)
  }

  if (isConnected && canPrint) {
    links.push(<AppDrawerItem to='/' icon={<Event />} text='Remplir son CRA' key='cra' />)
  }

  if (isConnected && config.featureFlipping.holidays) {
    links.push(<AppDrawerItem to='/holidays' icon={<BeachAccess />} text='Demande de congés' key='holidays' />)
  }

  if (isConnected && ['business', 'hr', 'board'].find(role => user.roles.indexOf(role) >= 0)) {
    links.push(<AppDrawerItem to='/lunches' icon={<Restaurant />} text='Déjeuners' key='lunches' />)
  }

  if (isConnected && ['hr', 'board'].find(role => user.roles.indexOf(role) >= 0)) {
    links.push(<AppDrawerItem to='/partners' icon={<SupervisorAccount />} text='Partners' key='partners' />)
  }

  const collapsed = shouldCollapseDrawer || !isConnected
  return (
    <Drawer
      type={collapsed ? 'temporary' : 'permanent'}
      open={open}
      classes={collapsed ? {} : { paper: classes.drawerPaper }}
      onRequestClose={onDrawerClose}
    >
      {collapsed ? null : <div className={classes.drawerHeader} />}
      <Divider />
      <List>
        {links}
      </List>
    </Drawer>
  )
}

AppDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  canPrint: PropTypes.bool.isRequired,
  isConnected: PropTypes.bool.isRequired,
  shouldCollapseDrawer: PropTypes.bool.isRequired,
  onDrawerClose: PropTypes.func.isRequired,
}

export default connect(mapStateToProps)(withStyles(styles)(AppDrawer))
