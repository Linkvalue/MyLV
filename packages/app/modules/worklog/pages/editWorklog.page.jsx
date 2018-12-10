import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Fab, Grid, withStyles } from '@material-ui/core'
import { Print } from '@material-ui/icons'
import classNames from 'classnames'
import { Redirect } from 'react-router'
import { Helmet } from 'react-helmet'

import { appName } from '../../../config'
import { canPrintSelector } from '../../client/client-selectors'
import Calendar from '../components/calendar.component'
import EntriesForm from '../components/entriesForm.component'
import Process from '../components/process.component'
import Printer from '../components/printer.component'

const mapStateToProps = state => ({
  shouldRemindProcess: state.settings.shouldRemindProcess,
  canPrint: canPrintSelector(state),
  isOffline: state.display.isOffline,
  isTabletOrMobile: state.display.isMobile || state.display.isTablet,
})

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
  offsetPrintButton: {
    bottom: theme.spacing.unit * 8,
  },
})

export const EditWorklogPage = ({
  shouldRemindProcess,
  classes,
  isOffline,
  isTabletOrMobile,
  canPrint,
}) => (!canPrint ? <Redirect to="/client" /> : (
  <Fragment>
    <Helmet>
      <title>Mon CRA | {appName}</title>
    </Helmet>
    <Grid container spacing={16} className={classes.worklogPage}>
      {shouldRemindProcess ? <Process /> : null}
      <Grid item md={4} xs={12}>
        <EntriesForm />
      </Grid>
      <Grid item md={8} xs={12}>
        <Calendar />
      </Grid>
      <Fab
        color="primary"
        className={classNames(classes.printButton, { [classes.offsetPrintButton]: isOffline && isTabletOrMobile })}
        onClick={printCra}
      >
        <Print />
      </Fab>
    </Grid>
    <Printer />
  </Fragment>
))

EditWorklogPage.propTypes = {
  classes: PropTypes.object.isRequired,
  shouldRemindProcess: PropTypes.bool.isRequired,
  canPrint: PropTypes.bool.isRequired,
  isTabletOrMobile: PropTypes.bool.isRequired,
  isOffline: PropTypes.bool.isRequired,
}

export default connect(mapStateToProps)(withStyles(styles)(EditWorklogPage))
