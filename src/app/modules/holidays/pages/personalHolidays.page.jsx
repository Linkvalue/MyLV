import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import {
  Button, CardActions, CardContent, Hidden, IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow,
  Toolbar,
  Typography, withStyles,
} from 'material-ui'
import { Help } from 'material-ui-icons'

import LoadingPage from '../../../components/loadingPage.component'
import { deleteHoliday, fetchPersonalHolidays } from '../holidays.actions'
import StyledHolidayRow from '../components/holidayRow.component'
import { holidayLabels } from '../../../../shared/calendar.constants'
import { getPersonalHolidays } from '../holidays.selectors'
import HolidaysDisclaimer from '../components/holidaysDisclaimer.component'
import { toggleHolidaysDisclaimer } from '../../settings/settings.actions'

const mapStateToProps = state => ({
  holidays: getPersonalHolidays(state),
  isLoading: state.holidays.isPersonalLoading,
  shouldDisplayHolidaysDisclaimer: state.settings.shouldDisplayHolidaysDisclaimer,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchPersonalHolidays,
  deleteHoliday,
  push,
  toggleHolidaysDisclaimer,
}, dispatch)

const styles = theme => ({
  tableWrapper: {
    overflowX: 'auto',
  },
  disclaimer: {
    marginBottom: theme.spacing.unit * 2,
  },
  toolbar: {
    justifyContent: 'space-between',
  },
})

export class PersonalHolidaysPage extends React.Component {
  componentWillMount() {
    this.props.fetchPersonalHolidays()
  }

  handleDisclaimerClose = () => this.props.toggleHolidaysDisclaimer()

  handleDisclaimerShow = () => this.props.toggleHolidaysDisclaimer(true)

  render() {
    const {
      isLoading,
      holidays,
      classes,
      deleteHoliday,
      push,
      shouldDisplayHolidaysDisclaimer,
    } = this.props

    if (isLoading) {
      return <LoadingPage />
    }

    let pageContent
    if (holidays.length > 0) {
      pageContent = (
        <Table className={classes.partnersTable}>
          <TableHead>
            <TableRow>
              <TableCell>Titre</TableCell>
              <TableCell>Date de la demande</TableCell>
              <Hidden mdDown>
                {Array.from(holidayLabels.entries()).map(([key, value]) => (
                  <TableCell numeric key={key}>{value}</TableCell>
                ))}
                <TableCell numeric>Status</TableCell>
              </Hidden>
            </TableRow>
          </TableHead>
          <TableBody>
            {holidays.map(holiday => (
              <StyledHolidayRow
                key={holiday.id}
                holiday={holiday}
                onHolidayDelete={deleteHoliday}
                onClick={() => push(`/holidays/${holiday.id}`)}
              />
            ))}
          </TableBody>
        </Table>
      )
    } else {
      pageContent = (
        <CardContent>
          <Typography>Aucune demande de congés pour le moment.</Typography>
        </CardContent>
      )
    }

    return (
      <div>
        {shouldDisplayHolidaysDisclaimer && (
          <HolidaysDisclaimer className={classes.disclaimer} onClose={this.handleDisclaimerClose} />
        )}
        <Paper>
          <Toolbar className={classes.toolbar}>
            <Typography variant="headline" component="h2" gutterBottom>
              Mes demandes de congés
            </Typography>
            {!shouldDisplayHolidaysDisclaimer && (
              <IconButton onClick={this.handleDisclaimerShow}><Help /></IconButton>
            )}
          </Toolbar>
          <div className={classes.tableWrapper}>
            {pageContent}
          </div>
          <CardActions>
            <Button size="small" color="primary" component={Link} to="/holidays/new">
              Nouvelle demande
            </Button>
          </CardActions>
        </Paper>
      </div>
    )
  }
}

PersonalHolidaysPage.propTypes = {
  fetchPersonalHolidays: PropTypes.func.isRequired,
  deleteHoliday: PropTypes.func.isRequired,
  toggleHolidaysDisclaimer: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  shouldDisplayHolidaysDisclaimer: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
  holidays: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    periods: PropTypes.array.isRequired,
    status: PropTypes.string.isRequired,
  })).isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PersonalHolidaysPage))
