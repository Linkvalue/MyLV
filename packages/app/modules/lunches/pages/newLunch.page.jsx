import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Button, Card, CardActions, CardContent, Typography } from '@material-ui/core'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'

import { appName } from '../../../config'
import ConnectedLunchForm from '../components/lunchForm.component'
import { postLunch } from '../lunches.actions'

const mapDispatchToProps = dispatch => bindActionCreators({ postLunch }, dispatch)

export const NewLunchPage = props => (
  <ConnectedLunchForm
    initialValues={{ date: moment().format('YYYY-MM-DD'), attendees: [] }}
    onFormSubmit={props.postLunch}
    render={({ children, valid }) => (
      <Card>
        <Helmet>
          <title>Nouveau déjeuner | {appName}</title>
        </Helmet>
        <CardContent>
          <Typography variant="headline" component="h2" gutterBottom>
            Nouveau déjeuner
          </Typography>
          {children}
        </CardContent>
        <CardActions>
          <Button size="small" color="primary" type="submit" disabled={!valid}>Créer</Button>
        </CardActions>
      </Card>
    )}
  />
)

NewLunchPage.propTypes = {
  postLunch: PropTypes.func.isRequired,
}

export default connect(undefined, mapDispatchToProps)(NewLunchPage)
