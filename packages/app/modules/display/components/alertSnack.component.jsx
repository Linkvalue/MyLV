import React from 'react'
import PropTypes from 'prop-types'
import { Snackbar, IconButton } from '@material-ui/core'
import { Error, Info } from '@material-ui/icons'

import { ALERT_ERROR, ALERT_INFO } from '../display.constants'

const icons = {
  [ALERT_ERROR]: <Error />,
  [ALERT_INFO]: <Info />,
}

const AlertSnack = ({
  alert,
  open,
  dissmissAlert,
  displayNextAlert,
}) => (
  <Snackbar
    key={alert.id}
    open={open}
    autoHideDuration={2000}
    onClose={dissmissAlert}
    onExited={displayNextAlert}
    message={alert.message}
    action={(
      <IconButton color="inherit" onClick={dissmissAlert}>{icons[alert.type]}</IconButton>
    )}
  />
)

AlertSnack.defaultProps = {
  alert: {},
}

AlertSnack.propTypes = {
  alert: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    message: PropTypes.string,
  }),
  open: PropTypes.bool.isRequired,
  dissmissAlert: PropTypes.func.isRequired,
  displayNextAlert: PropTypes.func.isRequired,
}

export default AlertSnack
