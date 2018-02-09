import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Button, Snackbar, withStyles } from 'material-ui'

import AppBar from '../components/appBar.component'
import AppDrawer from '../components/appDrawer.component'
import {
  toggleProofOfTransportDialog,
  togglePushNotifications,
  togglePushNotificationSnack,
} from '../modules/settings/settings.actions'
import FeatureFlipping from '../components/featureFlipping'
import ProofOfTransportDialog from '../components/dialogs/proofOfTansportDialog.component'

const mapStateToProps = ({ settings, transport }) => ({
  shouldDisplayPushNotificationSnack:
  settings.shouldDisplayPushNotificationSnack && !settings.desktopNotificationsEnabled && settings.rehydrated,
  shouldDisplayProofOfTransportDialog: settings.shouldDisplayProofOfTransportDialog && settings.rehydrated,
  hasInvalidTransportProof: transport.expirationDate < Date.now(),
})

const mapDispatchToProps = dispatch => bindActionCreators({
  togglePushNotifications,
  togglePushNotificationSnack: () => togglePushNotificationSnack(false),
  toggleProofOfTransportDialog,
}, dispatch)

const styles = theme => ({
  appRoot: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 1,
    overflow: 'hidden',
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  appContent: {
    backgroundColor: theme.palette.background.default,
    width: '100%',
    padding: theme.spacing.unit * 3,
    height: 'calc(100% - 56px)',
    marginTop: 56,
    boxSizing: 'border-box',
    overflowY: 'auto',
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
      marginTop: 64,
    },
  },
  '@media print': {
    appContent: {
      marginTop: 0,
      padding: 0,
    },
  },
  '@global iframe': {
    border: 'none',
  },
})

class App extends React.Component {
  constructor(...args) {
    super(...args)

    this.state = {
      drawerOpen: false,
      openProofOfTransportDialog: true,
    }
  }

  handleDrawerOpen = () => {
    this.setState({ drawerOpen: true })
  }

  handleDrawerClose = () => {
    this.setState({ drawerOpen: false })
  }

  handleDialogClose = () => this.setState({ openProofOfTransportDialog: false })

  handleDecline = () => {
    this.setState({ openProofOfTransportDialog: false })
    this.props.toggleProofOfTransportDialog()
  }

  render() {
    const { openProofOfTransportDialog } = this.state
    const {
      classes,
      children,
      shouldDisplayPushNotificationSnack,
      togglePushNotifications,
      togglePushNotificationSnack,
      shouldDisplayProofOfTransportDialog,
      hasInvalidTransportProof,
    } = this.props

    return (
      <div className={classes.appRoot}>
        <div className={classes.appFrame}>
          <AppBar onDrawerOpen={this.handleDrawerOpen} />
          <AppDrawer open={this.state.drawerOpen} onDrawerClose={this.handleDrawerClose} />
          <div className={classes.appContent}>
            {children}
          </div>
          <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            open={shouldDisplayPushNotificationSnack}
            message="Les notifications push sont maintenant disponnibles ! Elles permettent de te rappeller
            automatiquement quand tu dois remplir ton CRA. Tu peux les activer/désactiver depuis les paramètres de ton
            compte en haut à droite"
            action={[
              <Button key="ignore" color="inherit" size="small" onClick={togglePushNotificationSnack}>Ignorer</Button>,
              <Button key="ok" color="secondary" size="small" onClick={togglePushNotifications}>Activer</Button>,
            ]}
          />
          <FeatureFlipping feature="transport">
            <ProofOfTransportDialog
              open={openProofOfTransportDialog && shouldDisplayProofOfTransportDialog && hasInvalidTransportProof}
              onClose={this.handleDialogClose}
              onDecline={this.handleDecline}
            />
          </FeatureFlipping>
        </div>
      </div>
    )
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  shouldDisplayPushNotificationSnack: PropTypes.bool.isRequired,
  togglePushNotifications: PropTypes.func.isRequired,
  togglePushNotificationSnack: PropTypes.func.isRequired,
  toggleProofOfTransportDialog: PropTypes.func.isRequired,
  shouldDisplayProofOfTransportDialog: PropTypes.bool.isRequired,
  hasInvalidTransportProof: PropTypes.bool.isRequired,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App)))
