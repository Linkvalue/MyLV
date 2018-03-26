import React from 'react'
import PropTypes from 'prop-types'
import { Button, Snackbar } from 'material-ui'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { togglePushNotifications, togglePushNotificationSnack } from '../modules/settings/settings.actions'

const mapStateToProps = ({ auth, settings }) => ({
  isConnected: !!auth.user,
  shouldDisplayPushNotificationSnack:
    settings.shouldDisplayPushNotificationSnack && settings.desktopNotificationsInstalled &&
    !settings.desktopNotificationsEnabled && settings.rehydrated,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  togglePushNotifications,
  togglePushNotificationSnack: () => togglePushNotificationSnack(false),
}, dispatch)

export const PushSnack = ({
  shouldDisplayPushNotificationSnack,
  isConnected,
  togglePushNotificationSnack,
  togglePushNotifications,
}) => (
  <Snackbar
    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    open={shouldDisplayPushNotificationSnack && isConnected}
    message="Les notifications push sont maintenant disponnibles ! Elles permettent de te rappeller
              automatiquement quand tu dois remplir ton CRA. Tu peux les activer/désactiver depuis les paramètres de ton
              compte en haut à droite"
    action={[
      <Button key="ignore" color="inherit" size="small" onClick={togglePushNotificationSnack}>
        Ignorer
      </Button>,
      <Button key="ok" color="secondary" size="small" onClick={togglePushNotifications}>Activer</Button>,
    ]}
  />
)

PushSnack.propTypes = {
  shouldDisplayPushNotificationSnack: PropTypes.bool.isRequired,
  isConnected: PropTypes.bool.isRequired,
  togglePushNotificationSnack: PropTypes.func.isRequired,
  togglePushNotifications: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(PushSnack)
