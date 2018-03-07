import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Drawer, Divider, List, withStyles, ListSubheader } from 'material-ui'
import { BeachAccess, Person, Event, Restaurant, SupervisorAccount, FileUpload } from 'material-ui-icons'

import { canPrintSelector } from '../modules/client/client-selectors'
import AppDrawerItem from './appDrawerItem.component'
import Restricted from './restricted.component'
import FeatureFlipping from './featureFlipping'

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

const mapStateToProps = state => ({
  isConnected: !!state.auth.user,
  user: state.auth.user,
  canPrint: canPrintSelector(state),
  shouldCollapseDrawer: state.display.isMobile || state.display.isTablet,
})

const AppDrawer = ({
  user,
  classes,
  open,
  canPrint,
  isConnected,
  shouldCollapseDrawer,
  onDrawerClose,
}) => {
  const collapsed = shouldCollapseDrawer || !isConnected
  return (
    <Drawer
      variant={collapsed ? 'temporary' : 'permanent'}
      open={open}
      classes={collapsed ? {} : { paper: classes.drawerPaper }}
      onClose={onDrawerClose}
    >
      {collapsed ? null : <div className={classes.drawerHeader} />}
      <Divider />
      <List
        subheader={(
          <Restricted roles={['business', 'hr', 'board']} user={user}>
            <ListSubheader>Personnel</ListSubheader>
          </Restricted>
        )}
      >
        <Restricted roles={['tech']} user={user}>
          <AppDrawerItem to="/client" icon={<Person />} text="Client" />
          {canPrint ? <AppDrawerItem to="/" icon={<Event />} text="Remplir son CRA" /> : null}
        </Restricted>
        <FeatureFlipping feature="holidays">
          <AppDrawerItem to="/holidays/me" icon={<BeachAccess />} text="Mes demandes de congés" key="my-holidays" />
        </FeatureFlipping>
        <FeatureFlipping feature="transport">
          <AppDrawerItem to="/proof-upload" icon={<FileUpload />} text="Justificatif de transport" />
        </FeatureFlipping>
        <Restricted roles={['business', 'hr', 'board']} user={user}>
          <AppDrawerItem to="/lunches/me" icon={<Restaurant />} text="Mes déjeuners" />
        </Restricted>
        <Divider />
        <Restricted roles={['hr', 'board']} user={user}>
          <ListSubheader>Administration</ListSubheader>
          <AppDrawerItem to="/partners" icon={<SupervisorAccount />} text="Partners" />
          <FeatureFlipping feature="holidays">
            <AppDrawerItem to="/holidays" icon={<BeachAccess />} text="Demandes de congés" key="holidays" />
          </FeatureFlipping>
        </Restricted>
      </List>
    </Drawer>
  )
}

AppDrawer.defaultProps = {
  user: null,
}

AppDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  canPrint: PropTypes.bool.isRequired,
  isConnected: PropTypes.bool.isRequired,
  shouldCollapseDrawer: PropTypes.bool.isRequired,
  onDrawerClose: PropTypes.func.isRequired,
  user: PropTypes.object,
  classes: PropTypes.object.isRequired,
}

export default connect(mapStateToProps)(withStyles(styles)(AppDrawer))
