import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
Button, Card, CardActions, CardContent, Table, TableBody, TableCell, TableHead, TableRow, Typography
} from 'material-ui'

import LunchRow from '../components/lunchRow.component'
import {deleteLunch, fetchUserLunches} from '../lunches.actions'
import { getLunches } from '../lunches.selectors'

const mapStateToProps = state => ({
  lunches: getLunches(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({ fetchUserLunches, deleteLunch }, dispatch)

class LunchesPage extends Component {
  componentWillMount () {
    this.props.fetchUserLunches()
  }

  render () {
    const { lunches, ...actions } = this.props

    return (
      <Card>
        <CardContent>
          <Typography type='headline' component='h2' gutterBottom>
            Mes déjeuners
          </Typography>
          <Typography gutterBottom>
            Merci de renseigner ici les déjeuners en équipes payés par LinkValue. Ceci a pour but d'éviter de verser des
            tickets restaurants pour des déjeuners déjà remboursés.
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Intitulé</TableCell>
                <TableCell>Date</TableCell>
                <TableCell numeric>Participants</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {lunches.map(lunch => <LunchRow lunch={lunch} onLunchDelete={actions.deleteLunch} key={lunch.id} />)}
            </TableBody>
          </Table>
        </CardContent>
        <CardActions>
          <Button dense color='primary' component={Link} to='/lunches/new'>Ajouter un déjeuner</Button>
        </CardActions>
      </Card>
    )
  }
}

LunchesPage.propTypes = {
  lunches: PropTypes.array.isRequired,
  fetchUserLunches: PropTypes.func.isRequired,
  deleteLunch: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(LunchesPage)
