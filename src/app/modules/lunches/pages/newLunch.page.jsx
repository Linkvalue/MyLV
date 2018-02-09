import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Button, Card, CardActions, CardContent, Typography } from 'material-ui'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import LunchForm from '../components/lunchForm.component'
import { postLunch } from '../lunches.actions'

const mapDispatchToProps = dispatch => bindActionCreators({ postLunch }, dispatch)

const NewLunchPage = props => (
  <LunchForm
    initialValues={{ date: moment().format('DD/MM/YYYY'), attendees: [] }}
    onFormSubmit={props.postLunch}
    render={({ children, valid }) => (
      <Card>
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
