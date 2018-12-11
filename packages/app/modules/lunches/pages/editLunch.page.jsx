import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Card, CardActions, CardContent, Typography } from '@material-ui/core'
import { connect } from 'react-redux'
import moment from 'moment'
import { bindActionCreators } from 'redux'
import { Helmet } from 'react-helmet'

import { appName } from '@cracra/config/app'
import ConnectedLunchForm from '../components/lunchForm.component'
import { fetchLunchDetails, putLunch } from '../lunches.actions'
import LoadingPage from '../../../components/loadingPage.component'

const mapStateToProps = (state, { match }) => ({
  lunch: state.lunches.lunchesById[match.params.id],
  isLoading: state.lunches.isLoading,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  putLunch: ({ owner, ...data }) => putLunch(data),
  fetchLunchDetails,
}, dispatch)

export class EditLunchPage extends Component {
  componentWillMount() {
    this.props.fetchLunchDetails(this.props.match.params.id)
  }

  render() {
    const { lunch, isLoading } = this.props

    if (isLoading) {
      return <LoadingPage />
    }

    return (
      <ConnectedLunchForm
        initialValues={{ ...lunch, date: moment(lunch.date).format('YYYY-MM-DD') }}
        onFormSubmit={this.props.putLunch}
        render={({ children, valid, pristine }) => (
          <Card>
            <Helmet>
              <title>Éditer un déjeuner | {appName}</title>
            </Helmet>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Modification de : {lunch.label}
              </Typography>
              {children}
            </CardContent>
            <CardActions>
              <Button size="small" color="primary" type="submit" disabled={!valid || pristine}>Enregistrer</Button>
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
  }).isRequired,
  lunch: PropTypes.shape({
    date: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
  putLunch: PropTypes.func.isRequired,
  fetchLunchDetails: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(EditLunchPage)
