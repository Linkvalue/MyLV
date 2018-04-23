import React from 'react'
import { applyUpdate, install } from 'offline-plugin/runtime'
import { Button, Snackbar } from 'material-ui'

class AppUpdater extends React.Component {
  constructor(props, context) {
    super(props, context)

    install({
      onUpdateReady: () => {
        console.log('[SW]: Update auto install')
        applyUpdate()
      },
      onUpdated: () => {
        console.log('[SW]: Auto update installed')
        this.setState({ isDisplayed: true })
      },
      onUpdateFailed: () => {
        console.error('[SW]: Update failed')
      },
    })

    this.state = {
      isDisplayed: false,
    }
  }

  handleReloadClick = () => window.location.reload()

  render() {
    return (
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={this.state.isDisplayed}
        message="Mise à jour disponible"
        action={<Button color="primary" size="small" onClick={this.handleReloadClick}>Recharger</Button>}
      />
    )
  }
}

export default AppUpdater
