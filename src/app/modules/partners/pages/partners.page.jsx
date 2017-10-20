import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import PropTypes from 'prop-types'
import {
  Typography, Table, TableBody, TableHead, TableRow, TableCell, withStyles,
  TableFooter, TablePagination, Paper, Toolbar, CircularProgress
} from 'material-ui'

import { fetchPartners } from '../partners.actions'
import { getPartnersList } from '../partners.selectors'

const mapStateToProps = state => ({
  partners: getPartnersList(state),
  pageCount: state.partners.pageCount,
  limit: state.partners.limit,
  isLoading: state.partners.isLoading,
  labels: state.worklog.labels
})

const mapDispatchToProps = dispatch => bindActionCreators({ fetchPartners, push }, dispatch)

const styles = theme => ({
  fullNameCell: {
    width: '70%'
  },
  [theme.breakpoints.down('md')]: {
    entryCountCell: {
      paddingLeft: theme.spacing.unit * 2,
      paddingRight: theme.spacing.unit * 2
    }
  },
  tableWrapper: {
    overflowX: 'auto'
  },
  partnersTable: {
    overflowY: 'visible'
  },
  tableFooter: {
    width: '100%'
  },
  loaderContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%'
  }
})

export class PartnersPage extends Component {
  componentWillMount () {
    this.props.fetchPartners({
      page: this.props.match.params.page || 1,
      limit: this.props.limit
    })
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.match.params.page !== nextProps.match.params.page) {
      this.props.fetchPartners({
        page: nextProps.match.params.page,
        limit: nextProps.limit
      })
    }
  }

  getRowDisplay = ({from, to, count}) => `${from} of ${count / this.props.limit}`

  handleChangePage = (event, page) => this.props.push(`/partners/${page + 1}`)

  handleChangeRowsPerPage = event => this.props.fetchPartners({
    page: this.props.match.params.page || 1,
    limit: event.target.value
  })

  render () {
    const { partners, isLoading, labels, classes, match, pageCount, limit } = this.props

    if (isLoading) {
      return (
        <div className={classes.loaderContainer}>
          <CircularProgress className={classes.progress} size={100} />
        </div>
      )
    }

    return (
      <Paper>
        <Toolbar>
          <Typography type='headline' component='h2' gutterBottom>
            Partners
          </Typography>
        </Toolbar>
        <div className={classes.tableWrapper}>
          <Table className={classes.partnersTable}>
            <TableHead>
              <TableRow>
                <TableCell className={classes.fullNameCell}>Nom</TableCell>
                {Object.keys(labels).map(label => <TableCell numeric key={label} className={classes.entryCountCell}>{label}</TableCell>)}
                <TableCell numeric>Déjeuners</TableCell>
                <TableCell numeric>Ticket restaurants</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {partners.map(partner => (
                <TableRow hover key={partner.id}>
                  <TableCell>
                    {partner.firstName} {partner.lastName}
                  </TableCell>
                  {Object.keys(labels).map(label => (
                    <TableCell numeric key={label} className={classes.entryCountCell}>{partner.entryCounts[label] || 0}</TableCell>
                  ))}
                  <TableCell numeric>{partner.lunchesCount}</TableCell>
                  <TableCell numeric>{partner.mealVouchers}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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

PartnersPage.propTypes = {
  fetchPartners: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
  partners: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  labels: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  pageCount: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      page: PropTypes.string
    }).isRequired
  }).isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PartnersPage))
