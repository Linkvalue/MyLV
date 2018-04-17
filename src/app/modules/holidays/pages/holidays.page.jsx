import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import {
  CardContent,
  Paper,
  Table,
  TableBody,
  TableCell, TableFooter,
  TableHead, TablePagination,
  TableRow,
  Toolbar,
  Typography,
  Hidden,
  withStyles,
} from 'material-ui'
import qs from 'qs'

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
  partnersById: state.partners.partnersById,
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
      page: this.getPageNumber(),
      limit: this.props.limit,
    })
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location.search !== nextProps.location.search) {
      this.props.fetchHolidays({
        page: this.getPageNumber(nextProps),
        limit: nextProps.limit,
      })
    }
  }

  getPageNumber = (props = this.props) => Number(qs.parse(props.location.search.slice(1)).page || 1)

  getRowDisplay = () => `${this.getPageNumber()} of ${this.props.pageCount}`

  handleChangePage = (event, page) => this.props.push(`/holidays?page=${page + 1}`)

  handleChangeRowsPerPage = event => this.props.fetchHolidays({
    page: this.getPageNumber(),
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
      partnersById,
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
              <TableCell>Partner</TableCell>
              <TableCell>Date de la demande</TableCell>
              <Hidden mdDown>
                {Array.from(holidayLabels.entries()).map(([key, value]) => (
                  <TableCell numeric key={key}>{value}</TableCell>
                ))}
              </Hidden>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {holidays.map(holiday => (
              <StyledHolidayRow
                key={holiday.id}
                holiday={holiday}
                partner={partnersById[holiday.user]}
                displayPartnerName
                disableMenu
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
                page={this.getPageNumber() - 1}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                rowsPerPageOptions={[25, 50, 100]}
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
    user: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    periods: PropTypes.array.isRequired,
    status: PropTypes.string.isRequired,
  })).isRequired,
  partnersById: PropTypes.object.isRequired,
  pageCount: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(HolidaysPage))
