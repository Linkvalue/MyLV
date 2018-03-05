import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  Button, CardActions, Hidden, Paper, Table, TableBody, TableCell, TableHead, TableRow, Toolbar,
  Typography, withStyles,
} from 'material-ui'

import LoadingPage from '../../../components/loadingPage.component'
import { deleteHoliday, fetchPersonalHolidays } from '../holidays.actions'
import StyledHolidayRow from '../components/holidayRow.component'
import { holidayLabels } from '../../../../shared/calendar-constants'
import { getPersonalHolidays } from '../holidays.selectors'

const mapStateToProps = state => ({
  holidays: getPersonalHolidays(state),
  isLoading: state.holidays.isPersonalLoading,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchPersonalHolidays,
  deleteHoliday,
}, dispatch)

const styles = () => ({
  tableWrapper: {
    overflowX: 'auto',
  },
})

export class PersonalHolidaysPage extends React.Component {
  componentWillMount() {
    this.props.fetchPersonalHolidays()
  }

  render() {
    const {
      isLoading, holidays, classes, deleteHoliday,
    } = this.props

    if (isLoading) {
      return <LoadingPage />
    }

    let pageContent = <Typography>Aucune demande de congés pour le moment.</Typography>
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
              <StyledHolidayRow key={holiday.id} holiday={holiday} onHolidayDelete={deleteHoliday} />
            ))}
          </TableBody>
        </Table>
      )
    }

    return (
      <Paper>
        <Toolbar>
          <Typography variant="headline" component="h2" gutterBottom>
            Mes demandes de congés
          </Typography>
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
    )
  }
}

PersonalHolidaysPage.propTypes = {
  fetchPersonalHolidays: PropTypes.func.isRequired,
  deleteHoliday: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
  holidays: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    periods: PropTypes.array.isRequired,
    status: PropTypes.string.isRequired,
  })).isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PersonalHolidaysPage))
