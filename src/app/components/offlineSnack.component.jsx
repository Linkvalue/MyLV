import React from 'react'
import PropTypes from 'prop-types'
import { Button, CircularProgress, Snackbar, withStyles } from 'material-ui'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import config from '../config'
import { tryReconnect } from '../modules/auth/auth.actions'

const mapStateToProps = state => ({
  isOffline: state.display.isOffline,
})

const mapDispatchToProps = dispatch => bindActionCreators({ tryReconnect }, dispatch)

const styles = {
  buttonWrapper: {
    position: 'relative',
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: '-12px',
    marginLeft: '-12px',
  },
}

class OfflineSnack extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      awaitingReconnect: false,
      reconnectIn: 0,
    }

    this.timerInterval = null
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isOffline && !this.props.isOffline) {
      this.autoReconnect()
    }
    if (!nextProps.isOffline && this.props.isOffline && this.timerInterval) {
      clearInterval(this.timerInterval)
    }
  }

  autoReconnect(leftRetries = config.autoReconnectRetries) {
    const retryTime = Date.now() + (((config.autoReconnectRetries + 1) - leftRetries) * config.autoReconnectTimeout)
    this.timerInterval = setInterval(async () => {
      const reconnectIn = Math.max(Math.round((retryTime - Date.now()) / 1000), 0)
      this.setState({ reconnectIn })

      if (reconnectIn <= 0) {
        try {
          await this.handleReconnect()
        } catch (e) {
          this.setState({ awaitingReconnect: false })
          this.autoReconnect(leftRetries - 1)
        }
      }
    }, 1000)
  }

  handleReconnect = async () => {
    clearInterval(this.timerInterval)
    this.setState({ awaitingReconnect: true, reconnectIn: 0 })
    try {
      await this.props.tryReconnect()
    } catch (e) {
      throw e
    } finally {
      this.setState({ awaitingReconnect: false })
    }
  }

  render() {
    const { awaitingReconnect, reconnectIn } = this.state
    const { classes, isOffline } = this.props

    return (
      <Snackbar
        open={isOffline}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        message={`Hors ligne ${reconnectIn ? `(Reco dans ${reconnectIn}sec)` : ''}`}
        action={(
          <div className={classes.buttonWrapper}>
            <Button color="primary" disabled={awaitingReconnect} onClick={this.handleReconnect}>Reconnecter</Button>
            {awaitingReconnect && <CircularProgress size={24} className={classes.buttonProgress} />}
          </div>
        )}
      />
    )
  }
}

OfflineSnack.propTypes = {
  isOffline: PropTypes.bool.isRequired,
  tryReconnect: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(OfflineSnack))
