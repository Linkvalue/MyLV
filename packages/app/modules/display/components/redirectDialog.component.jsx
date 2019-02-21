import React from 'react'
import PropTypes from 'prop-types'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core'
import config from '@cracra/config/app'

const RedirectDialog = ({ open, onClose }) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>{'MyLV c\'est fini :('}</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Après quelques années de bons et loyaux services, il est temps pour MyLV de prendre sa retraite. Vous devrez
        désormais par la plateforme Arborescence, plus complète et plus rapide.
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button href={config.redirectUrl} size="small" color="primary">
        Me rediriger
      </Button>
      <Button size="small" onClick={onClose}>Continuer sur MyLV</Button>
    </DialogActions>
  </Dialog>
)

RedirectDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default RedirectDialog
