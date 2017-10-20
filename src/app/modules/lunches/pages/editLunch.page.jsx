import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Card, CardActions, CardContent, Typography } from 'material-ui'
import { connect } from 'react-redux'
import moment from 'moment'
import { bindActionCreators } from 'redux'

import LunchForm from '../components/lunchForm.component'
import { fetchLunchDetails, putLunch } from '../lunches.actions'

const mapStateToProps = (state, { match }) => ({
  lunch: state.lunches.lunchesById[match.params.id],
  isLoading: state.lunches.isLoading,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  putLunch: ({ owner, ...data }) => putLunch(data),
  fetchLunchDetails,
}, dispatch)

class EditLunchPage extends Component {
  componentWillMount () {
    this.props.fetchLunchDetails(this.props.match.params.id)
  }

  render () {
    const { lunch, isLoading } = this.props

    if (isLoading) {
      return null
    }

    return (
      <LunchForm
        initialValues={{ ...lunch, date: moment(lunch.date).format('DD/MM/YYYY') }}
        onFormSubmit={this.props.putLunch}
        render={({ children, valid, pristine }) => (
          <Card>
            <CardContent>
              <Typography type='headline' component='h2' gutterBottom>
                Modification de : {lunch.label}
              </Typography>
              {children}
            </CardContent>
            <CardActions>
              <Button dense color='primary' type='submit' disabled={!valid || pristine}>Enregistrer</Button>
            </CardActions>
          </Card>
        )}
      />
    )
  }
}

EditLunchPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ id: PropTypes.string.isRequired }),
  }),
  lunch: PropTypes.object.isRequired,
  putLunch: PropTypes.func.isRequired,
  fetchLunchDetails: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(EditLunchPage)
