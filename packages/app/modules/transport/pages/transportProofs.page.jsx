import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import moment from 'moment'
import { Delete, SaveAlt } from '@material-ui/icons'
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
  withStyles,
  IconButton,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Hidden,
} from '@material-ui/core'
import qs from 'qs'
import { Helmet } from 'react-helmet'

import { appName } from '../../../config'
import LoadingPage from '../../../components/loadingPage.component'
import { deleteTransportProof, fetchTransportProofs } from '../transport.actions'
import { getPartnersTransportProofs } from '../transport.selectors'
import { cracraEndpoint, lvConnect } from '../../auth/lvconnect'

const mapStateToProps = state => ({
  proofs: getPartnersTransportProofs(state),
  isLoading: state.transport.isPartnersProofsLoading,
  pageCount: state.transport.pageCount,
  limit: state.transport.limit,
  partnersById: state.partners.partnersById,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchTransportProofs,
  deleteTransportProof,
  push,
}, dispatch)

const proofEndpoint = `${cracraEndpoint}/api/proofOfTransport`
const getProofDownloadLink = proof => `${proofEndpoint}/${proof.id}/download?access_token=${lvConnect.getAccessToken()}`
const downloadLink = `${proofEndpoint}/download?access_token=${lvConnect.getAccessToken()}`

const styles = theme => ({
  tableWrapper: {
    overflowX: 'auto',
  },
  tableFooter: {
    width: '100%',
  },
  downloadCard: {
    marginTop: theme.spacing.unit * 3,
  },
  downloadAction: {
    right: theme.spacing.unit,

    [theme.breakpoints.up('md')]: {
      right: theme.spacing.unit * 3,
    },
  },
})

class TransportProofsPage extends React.Component {
  componentWillMount() {
    this.props.fetchTransportProofs({
      page: this.getPageNumber(),
      limit: this.props.limit,
    })
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location.search !== nextProps.location.search) {
      this.props.fetchTransportProofs({
        page: this.getPageNumber(nextProps),
        limit: nextProps.limit,
      })
    }
  }

  getPageNumber = (props = this.props) => Number(qs.parse(props.location.search.slice(1)).page || 1)

  getRowDisplay = () => `${this.getPageNumber()} of ${this.props.pageCount}`

  handleChangePage = (event, page) => this.props.push(`/transport?page=${page + 1}`)

  handleChangeRowsPerPage = event => this.props.fetchTransportProofs({
    page: this.getPageNumber(),
    limit: event.target.value,
  })

  handleProofDelete = proof => () => this.props.deleteTransportProof(proof)

  render() {
    const {
      isLoading,
      proofs,
      classes,
      pageCount,
      limit,
      partnersById,
    } = this.props

    if (isLoading) {
      return <LoadingPage />
    }

    let pageContent
    if (proofs.length > 0) {
      pageContent = (
        <Table className={classes.partnersTable}>
          <TableHead>
            <TableRow>
              <TableCell>Partner</TableCell>
              <TableCell>Valide jusqu'au</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {proofs.map(proof => (
              <TableRow key={proof.id}>
                {proof.user ? (
                  <TableCell>{partnersById[proof.user].firstName} {partnersById[proof.user].lastName}</TableCell>
                ) : (
                  <TableCell><i>Partner supprimé</i></TableCell>
                )}
                <TableCell>{moment(proof.expirationDate).format('DD/MM/YYYY')}</TableCell>
                <TableCell numeric>
                  <IconButton onClick={this.handleProofDelete(proof)}><Delete /></IconButton>
                  <IconButton component="a" href={getProofDownloadLink(proof)} download><SaveAlt /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )
    } else {
      pageContent = (
        <CardContent>
          <Typography>Aucun justificatif uploadé pour le moment.</Typography>
        </CardContent>
      )
    }

    return (
      <React.Fragment>
        <Helmet>
          <title>Justificatifs de transport | {appName}</title>
        </Helmet>
        <Paper>
          <Toolbar>
            <Typography variant="headline" component="h2" gutterBottom>
              Justificatifs de transport
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
        <Paper className={classes.downloadCard}>
          <List>
            <ListItem>
              <ListItemText
                primary="Telecharger tous les justificatifs pour le mois en cours"
                secondary={`> ${moment().format('MMMM YYYY')}`}
              />
              <ListItemSecondaryAction classes={{ root: classes.downloadAction }}>
                <Hidden mdDown>
                  <Button color="primary" variant="raised" component="a" href={downloadLink} download>
                    Télécharger <SaveAlt />
                  </Button>
                </Hidden>
                <Hidden mdUp>
                  <IconButton color="primary" component="a" href={downloadLink} download><SaveAlt /></IconButton>
                </Hidden>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </Paper>
      </React.Fragment>
    )
  }
}

TransportProofsPage.propTypes = {
  fetchTransportProofs: PropTypes.func.isRequired,
  deleteTransportProof: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
  proofs: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    user: PropTypes.string,
    expirationDate: PropTypes.string.isRequired,
  })).isRequired,
  partnersById: PropTypes.object.isRequired,
  pageCount: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TransportProofsPage))
