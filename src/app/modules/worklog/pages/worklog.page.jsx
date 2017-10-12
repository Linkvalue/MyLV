import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'
import { Button, Grid, withStyles } from 'material-ui'

import { canPrintSelector } from '../../client/client-selectors'
import Calendar from '../components/calendar.component'
import EntriesForm from '../components/entriesForm.component'
import Process from '../components/process.component'
import Printer from '../components/printer/printer.component'

const mapStateToProps = state => ({
  shouldRemindProcess: state.settings.shouldRemindProcess,
  canPrint: canPrintSelector(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({ push }, dispatch)

const printCra = () => window.print()

const styles = theme => ({
  '@media print': {
    worklogPage: {
      display: 'none'
    }
  },
  printButton: {
    position: 'fixed',
    right: theme.spacing.unit * 2,
    bottom: theme.spacing.unit * 2,
    zIndex: 10
  }
})

class WorklogPage extends React.Component {
  componentDidMount () {
    if (!this.props.canPrint) {
      this.props.push('/client')
    }
  }

  render () {
    const { shouldRemindProcess, classes } = this.props

    return (
      <div>
        <Grid container className={classes.worklogPage}>
          {shouldRemindProcess ? <Process /> : null}
          <EntriesForm />
          <Calendar />
          <Button fab color='primary' className={classes.printButton} onClick={printCra}>
            <i className='material-icons'>print</i>
          </Button>
        </Grid>
        <Printer />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(WorklogPage))
