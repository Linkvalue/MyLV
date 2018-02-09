import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  AppBar as MuiAppBar,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  withStyles,
} from 'material-ui'
import { Menu as MenuIcon } from 'material-ui-icons'

import { logout } from '../modules/auth/auth.actions'
import { drawerWidth } from './appDrawer.component'

const styles = theme => ({
  appBar: {
    position: 'absolute',
    width: '100%',
    order: 1,
  },
  appBarDesktop: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
  },
  flex: {
    flex: 1,
  },
  userDetails: {
    display: 'flex',
    alignItems: 'center',
    textTransform: 'capitalize',
  },
  avatar: {
    marginLeft: theme.spacing.unit,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  '@media print': {
    appBar: {
      display: 'none',
    },
  },
})

const mapStateToProps = state => ({
  user: state.auth.user,
  shouldCollapseBar: state.display.isDesktop,
})

const mapDispatchToProps = dispatch => bindActionCreators({ logout }, dispatch)

class AppBar extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      anchor: null,
      open: false,
    }
  }

  handleMenuOpen = (event) => {
    this.setState({ open: true, anchor: event.currentTarget })
  }

  handleRequestClose = () => {
    this.setState({ open: false })
  }

  render() {
    const {
      user, logout, classes, shouldCollapseBar, onDrawerOpen,
    } = this.props
    const collapsed = shouldCollapseBar && user

    let avatar
    if (user) {
      const fullName = `${user.firstName} ${user.lastName}`
      avatar = (
        <div className={classes.userDetails}>
          {fullName}
          <IconButton color="inherit" onClick={this.handleMenuOpen} className={classes.avatar}>
            <Avatar alt={fullName} src={user.profilePictureUrl} />
            <Menu
              id="account-menu"
              anchorEl={this.state.anchor}
              open={this.state.open}
              onClose={this.handleRequestClose}
            >
              <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
          </IconButton>
        </div>
      )
    }

    let menuButton
    if (!shouldCollapseBar && user) {
      menuButton = (
        <IconButton color="inherit" className={classes.menuButton} onClick={onDrawerOpen}>
          <MenuIcon />
        </IconButton>
      )
    }

    return (
      <MuiAppBar className={classnames(classes.appBar, collapsed && classes.appBarDesktop)}>
        <Toolbar>
          {menuButton}
          <Typography variant="title" color="inherit" className={classes.flex}>
            CraCra
          </Typography>
          {avatar}
        </Toolbar>
      </MuiAppBar>
    )
  }
}

AppBar.defaultProps = {
  user: null,
}

AppBar.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    profilePictureUrl: PropTypes.string.isRequired,
  }),
  logout: PropTypes.func.isRequired,
  shouldCollapseBar: PropTypes.bool.isRequired,
  onDrawerOpen: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AppBar))
