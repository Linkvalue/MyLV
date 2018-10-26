import React from 'react'
import PropTypes from 'prop-types'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core'
import { Link } from 'react-router-dom'

const ProofOfTransportDialog = ({ open, onClose, onDecline }) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>Titre de transport requis</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Tu as oublié de fournir un justificatif d'achat de titre de transport pour ce mois.
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="default">
        Passer
      </Button>
      <Button onClick={onDecline}>
        Je n'ai pas de titre de transport
      </Button>
      <Button onClick={onClose} color="primary" component={Link} to="/transport/upload">
        Uploader
      </Button>
    </DialogActions>
  </Dialog>
)

ProofOfTransportDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onDecline: PropTypes.func.isRequired,
}

export default ProofOfTransportDialog
