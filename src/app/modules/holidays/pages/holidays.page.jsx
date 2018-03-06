import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import {
  Paper,
  Table,
  TableBody,
  TableCell, TableFooter,
  TableHead, TablePagination,
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
  pageCount: state.holidays.pageCount,
  limit: state.holidays.limit,
})

const mapDispatchToProps = dispatch => bindActionCreators({ fetchHolidays, push }, dispatch)

const styles = () => ({
  tableWrapper: {
    overflowX: 'auto',
  },
  tableFooter: {
    width: '100%',
  },
})

export class HolidaysPage extends React.Component {
  componentWillMount() {
    this.props.fetchHolidays({
      page: this.props.match.params.page || 1,
      limit: this.props.limit,
    })
  }

  getRowDisplay = ({ to, count }) => `${Math.round(to / count)} of ${count / this.props.limit}`

  handleChangePage = (event, page) => this.props.push(`/holidays/${page + 1}`)

  handleChangeRowsPerPage = event => this.props.fetchHolidays({
    page: this.props.match.params.page || 1,
    limit: event.target.value,
  })

  render() {
    const {
      isLoading,
      holidays,
      classes,
      push,
      pageCount,
      limit,
      match,
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
        <table className={classes.tableFooter}>
          <TableFooter>
            <TableRow>
              <TablePagination
                count={pageCount * limit}
                rowsPerPage={limit}
                labelDisplayedRows={this.getRowDisplay}
                page={(match.params.page || 1) - 1}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                rowsPerPageOptions={[1, 25, 50, 100]}
              />
            </TableRow>
          </TableFooter>
        </table>
      </Paper>
    )
  }
}

HolidaysPage.propTypes = {
  fetchHolidays: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
  holidays: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    periods: PropTypes.array.isRequired,
    status: PropTypes.string.isRequired,
  })).isRequired,
  pageCount: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      page: PropTypes.number,
    }).isRequired,
  }).isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(HolidaysPage))
