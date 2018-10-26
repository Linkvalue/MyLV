import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  Drawer,
  Divider,
  List,
  withStyles,
  ListSubheader,
  Hidden,
  Avatar,
  Typography,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core'
import {
  BeachAccess,
  Person,
  Event,
  Restaurant,
  SupervisorAccount,
  CloudUpload,
  Settings,
  PowerSettingsNew,
  DirectionsTransit,
} from '@material-ui/icons'

import AppDrawerItem from './appDrawerItem.component'
import Restricted from './restricted.component'
import FeatureFlipping from './featureFlipping'
import drawerBackground from '../assets/images/drawer-bg.jpg'
import { logout } from '../modules/auth/auth.actions'

export const drawerWidth = 240

const styles = theme => ({
  drawerPaper: {
    position: 'relative',
    height: '100%',
    width: drawerWidth,
  },
  drawerPaperCollapsed: {
    height: '100%',
  },
  drawerHeader: theme.mixins.toolbar,
  '@media print': {
    drawerPaper: {
      display: 'none',
    },
  },
  drawerProfile: {
    background: `url(${drawerBackground}) center no-repeat`,
    backgroundSize: 'cover',
    height: theme.spacing.unit * 17,
    color: theme.palette.common.white,
    boxSizing: 'border-box',
    padding: `${theme.spacing.unit * 2}px`,
  },
  fullName: {
    textTransform: 'capitalize',
    fontWeight: 'bold',
    marginTop: theme.spacing.unit * 2,
  },
  linkList: {
    backgroundColor: theme.palette.common.white,
    [theme.breakpoints.down('md')]: {
      flex: 1,
      overflowY: 'auto',
    },
  },
})

const mapStateToProps = state => ({
  isConnected: !!state.auth.user,
  user: state.auth.user,
  shouldCollapseDrawer: state.display.isMobile || state.display.isTablet,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  logout,
}, dispatch)

const AppDrawer = ({
  user,
  classes,
  open,
  isConnected,
  shouldCollapseDrawer,
  onDrawerClose,
  logout,
}) => {
  const collapsed = shouldCollapseDrawer || !isConnected
  return (
    <Drawer
      variant={collapsed ? 'temporary' : 'permanent'}
      open={open}
      classes={{ paper: collapsed ? classes.drawerPaperCollapsed : classes.drawerPaper }}
      onClose={onDrawerClose}
    >
      {collapsed ? null : <div className={classes.drawerHeader} />}
      <Hidden mdUp>
        {user && (
          <div className={classes.drawerProfile}>
            <Avatar src={user.profilePictureUrl} alt={`${user.firstName} ${user.lastName}`} />
            <Typography color="inherit" variant="subheading" className={classes.fullName}>
              {`${user.firstName} ${user.lastName}`}
            </Typography>
            <Typography color="inherit">{user.email}</Typography>
          </div>)
        }
      </Hidden>
      <Divider />
      <List className={classes.linkList}>
        <Restricted roles={['hr', 'board']} user={user}>
          <ListSubheader>Personnel</ListSubheader>
        </Restricted>
        <AppDrawerItem to="/client" icon={<Person />} text="Client" />
        <AppDrawerItem to="/" icon={<Event />} text="Remplir son CRA" />
        <FeatureFlipping feature="holidays">
          <AppDrawerItem to="/holidays/me" icon={<BeachAccess />} text="Mes demandes de congés" key="my-holidays" />
        </FeatureFlipping>
        <FeatureFlipping feature="transport">
          <AppDrawerItem to="/transport/upload" icon={<CloudUpload />} text="Justificatif de transport" />
        </FeatureFlipping>
        <Restricted roles={['business', 'hr', 'board']} user={user}>
          <AppDrawerItem to="/lunches/me" icon={<Restaurant />} text="Mes déjeuners" />
        </Restricted>
        <Divider />
        <Restricted roles={['hr', 'board']} user={user}>
          <ListSubheader>Administration</ListSubheader>
          <AppDrawerItem to="/partners" icon={<SupervisorAccount />} text="Partners" />
          <FeatureFlipping feature="holidays">
            <AppDrawerItem to="/holidays" icon={<BeachAccess />} text="Demandes de congés" />
          </FeatureFlipping>
          <FeatureFlipping feature="transport">
            <AppDrawerItem to="/transport" icon={<DirectionsTransit />} text="Justificatifs de transport" />
          </FeatureFlipping>
        </Restricted>
      </List>
      <Hidden mdUp>
        <List disablePadding>
          <Divider />
          <AppDrawerItem to="/settings" icon={<Settings />} text="Paramètres" />
          <ListItem button onClick={logout}>
            <ListItemIcon>
              <PowerSettingsNew />
            </ListItemIcon>
            <ListItemText primary="Se déconnecter" />
          </ListItem>
        </List>
      </Hidden>
    </Drawer>
  )
}

AppDrawer.defaultProps = {
  user: null,
}

AppDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  isConnected: PropTypes.bool.isRequired,
  shouldCollapseDrawer: PropTypes.bool.isRequired,
  onDrawerClose: PropTypes.func.isRequired,
  user: PropTypes.object,
  classes: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AppDrawer))
