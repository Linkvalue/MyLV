import React from 'react'
import PropTypes from 'prop-types'
import { Button, Card, CardActions, CardContent, Typography } from 'material-ui'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import moment from 'moment'

import HookedHolidayRequestForm from '../components/holidayRequestForm.component'
import { putHoliday } from '../holidays.actions'

const mapStateToProps = (state, { match }) => ({
  holidayRequest: state.holidays.holidaysById[match.params.id],
  isLoading: state.holidays.isUniqueLoading,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  putHoliday,
}, dispatch)

export const HolidayRequestEditPage = ({ putHoliday, holidayRequest }) => (
  <HookedHolidayRequestForm
    initialValues={{
      ...holidayRequest,
      periods: holidayRequest.periods.map(period => ({
        ...period,
        startDate: moment(period.startDate).format('YYYY-MM-DD'),
        startOnPM: moment(period.startDate).hours() === 11,
        endDate: moment(period.endDate).format('YYYY-MM-DD'),
        endOnPM: moment(period.endDate).hours() === 23,
      })),
    }}
    onFormSubmit={putHoliday}
    render={({ children, valid }) => (
      <Card>
        <CardContent>
          <Typography variant="headline" component="h2" gutterBottom>
            Editer une demande de congé
          </Typography>
          {children}
        </CardContent>
        <CardActions>
          <Button size="small" color="primary" type="submit" disabled={!valid}>Sauvegarder</Button>
        </CardActions>
      </Card>
    )}
  />
)

HolidayRequestEditPage.propTypes = {
  putHoliday: PropTypes.func.isRequired,
  holidayRequest: PropTypes.shape({
    periods: PropTypes.arrayOf(PropTypes.shape({
      startDate: PropTypes.string.isRequired,
      endDate: PropTypes.string.isRequired,
    })).isRequired,
  }).isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(HolidayRequestEditPage)
