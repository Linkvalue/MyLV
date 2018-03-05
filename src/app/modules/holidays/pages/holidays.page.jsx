import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
  withStyles,
} from 'material-ui'

import LoadingPage from '../../../components/loadingPage.component'
import { fetchHolidays } from '../holidays.actions'
import StyledHolidayRow from '../components/holidayRow.component'
import { holidayLabels } from '../../../../shared/calendar-constants'
import { getPartnersHolidays } from '../holidays.selectors'

const mapStateToProps = state => ({
  holidays: getPartnersHolidays(state),
  isLoading: state.holidays.isPartnersHolidaysLoading,
})

const mapDispatchToProps = dispatch => bindActionCreators({ fetchHolidays }, dispatch)

const styles = () => ({
  tableWrapper: {
    overflowX: 'auto',
  },
})

export class HolidaysPage extends React.Component {
  componentWillMount() {
    this.props.fetchHolidays()
  }

  render() {
    const {
      isLoading,
      holidays,
      classes,
      push,
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
              <TableCell>Partner</TableCell>
              <TableCell>Date de la demande</TableCell>
              {Array.from(holidayLabels.entries()).map(([key, value]) => (
                <TableCell numeric key={key}>{value}</TableCell>
              ))}
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {holidays.map(holiday => (
              <StyledHolidayRow
                key={holiday.id}
                holiday={holiday}
                displayPartnerName
                disableMenu
                onClick={() => push(`/holidays/details/${holiday.id}`)}
              />
            ))}
          </TableBody>
        </Table>
      )
    }

    return (
      <Paper>
        <Toolbar>
          <Typography variant="headline" component="h2" gutterBottom>
            Demandes de congés
          </Typography>
        </Toolbar>
        <div className={classes.tableWrapper}>
          {pageContent}
        </div>
      </Paper>
    )
  }
}

HolidaysPage.propTypes = {
  fetchHolidays: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
  holidays: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    periods: PropTypes.array.isRequired,
    validated: PropTypes.bool.isRequired,
  })).isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(HolidaysPage))
