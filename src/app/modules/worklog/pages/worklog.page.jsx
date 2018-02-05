import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'
import { Button, Grid, withStyles } from 'material-ui'
import { Print } from 'material-ui-icons'

import { canPrintSelector } from '../../client/client-selectors'
import Calendar from '../components/calendar.component'
import EntriesForm from '../components/entriesForm.component'
import Process from '../components/process.component'
import Printer from '../components/printer.component'
import ProofOfTransportDialog from '../../../components/dialogs/proofOfTansportDialog.component'
import { disableProofOfTransportDialog } from '../../settings/settings-actions'
import { featureFlipping } from '../../../config'

const mapStateToProps = state => ({
  shouldRemindProcess: state.settings.shouldRemindProcess,
  canPrint: canPrintSelector(state),
  shouldDisplayProofOfTransportDialog: state.settings.shouldDisplayProofOfTransportDialog,
  hasInvalidTransportProof: state.transport.expirationDate < Date.now(),
})

const mapDispatchToProps = dispatch => bindActionCreators({ push, disableProofOfTransportDialog }, dispatch)

const printCra = () => window.print()

const styles = theme => ({
  '@media print': {
    worklogPage: {
      display: 'none',
    },
  },
  printButton: {
    position: 'fixed',
    right: theme.spacing.unit * 2,
    bottom: theme.spacing.unit * 2,
    zIndex: 10,
  },
})

export class WorklogPage extends React.Component {
  constructor (props, context) {
    super(props, context)

    this.state = {
      openProofOfTransportDialog: true,
    }
  }

  componentWillMount () {
    if (!this.props.canPrint) {
      this.props.push('/client')
    }
  }

  handleRequestClose = () => this.setState({ openProofOfTransportDialog: false })

  handleDecline = () => {
    this.setState({ openProofOfTransportDialog: false })
    this.props.disableProofOfTransportDialog()
  }

  render () {
    const { shouldRemindProcess, shouldDisplayProofOfTransportDialog, hasInvalidTransportProof, classes } = this.props

    return (
      <div>
        <Grid container className={classes.worklogPage}>
          {shouldRemindProcess ? <Process /> : null}
          <EntriesForm />
          <Calendar />
          <Button variant='fab' color='primary' className={classes.printButton} onClick={printCra}>
            <Print />
          </Button>
        </Grid>
        <Printer />
        {featureFlipping.transport ? <ProofOfTransportDialog
          open={this.state.openProofOfTransportDialog && shouldDisplayProofOfTransportDialog && hasInvalidTransportProof}
          onClose={this.handleRequestClose}
          onDecline={this.handleDecline}
        /> : null}
      </div>
    )
  }
}

WorklogPage.propTypes = {
  classes: PropTypes.object.isRequired,
  shouldRemindProcess: PropTypes.bool.isRequired,
  canPrint: PropTypes.bool.isRequired,
  push: PropTypes.func.isRequired,
  disableProofOfTransportDialog: PropTypes.func.isRequired,
  shouldDisplayProofOfTransportDialog: PropTypes.bool.isRequired,
  hasInvalidTransportProof: PropTypes.bool.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(WorklogPage))
