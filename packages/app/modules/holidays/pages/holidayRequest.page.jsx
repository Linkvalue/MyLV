import React from 'react'
import PropTypes from 'prop-types'
import { Button, Card, CardActions, CardContent, Typography } from '@material-ui/core'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Helmet } from 'react-helmet'

import { appName } from '@cracra/config/app'
import HookedHolidayRequestForm from '../components/holidayRequestForm.component'
import { postHoliday } from '../holidays.actions'

const mapDispatchToProps = dispatch => bindActionCreators({
  postHoliday,
}, dispatch)

export const HolidayRequestPage = ({ postHoliday }) => (
  <HookedHolidayRequestForm
    onFormSubmit={postHoliday}
    render={({ children, valid }) => (
      <Card>
        <Helmet>
          <title>Nouvelle demande de congés | {appName}</title>
        </Helmet>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            Nouvelle demande de congé
          </Typography>
          {children}
        </CardContent>
        <CardActions>
          <Button size="small" color="primary" type="submit" disabled={!valid}>Envoyer</Button>
        </CardActions>
      </Card>
    )}
  />
)

HolidayRequestPage.propTypes = {
  postHoliday: PropTypes.func.isRequired,
}

export default connect(undefined, mapDispatchToProps)(HolidayRequestPage)
