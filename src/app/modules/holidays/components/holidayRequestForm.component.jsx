import React from 'react'
import PropTypes from 'prop-types'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { Field, FieldArray, formValueSelector, reduxForm } from 'redux-form'
import moment from 'moment'
import { Paper, Table, TableBody, TableCell, TableHead, TableRow } from 'material-ui'

import TextField from '../../../components/inputs/textField.component'
import ConnectedPeriodsList from '../components/periodsList.component'
import { holidayLabels } from '../../../../shared/calendar-constants'
import { formatPeriod, getDaysForLabel } from '../holidays.utils'

const selector = formValueSelector('holidaysForm')
const mapStateToProps = state => ({
  periods: selector(state, 'periods'),
})

const validate = ({ title, periods }) => ({
  title: title ? null : 'Requis',
  periods: periods
    .map(formatPeriod)
    .reduce((acc, period, index) => {
      if (moment(period.endDate).diff(moment(period.startDate)) <= 0) {
        acc[index] = { startDate: 'Date de départ supérieure à la date de fin' }
      }
      return acc
    }, []),
})

export const HolidayRequestForm = ({
  handleSubmit,
  valid,
  pristine,
  render,
  periods,
}) => (
  <form onSubmit={handleSubmit}>
    {render({
      valid,
      pristine,
      children: (
        <React.Fragment>
          <Field
            name="title"
            type="text"
            label="Titre"
            fullWidth
            inputProps={{ autoFocus: true }}
            component={TextField}
            helperText="Utilisé pour repérer cette demande dans votre liste de demande de congés personnelle"
          />
          <Field
            name="comment"
            type="text"
            label="Commentaire"
            fullWidth
            component={TextField}
            inputProps={{ multiline: true, rows: 3 }}
            helperText="Utilisé pour spécifier une information particulière à la personne qui va valider votre demande"
          />
          <FieldArray name="periods" component={ConnectedPeriodsList} />
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  {Array.from(holidayLabels.keys()).map(key => (
                    <TableCell numeric key={key}>{holidayLabels.get(key)}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  {Array.from(holidayLabels.keys()).map(key => (
                    <TableCell numeric key={key}>
                      {getDaysForLabel(periods, key)}
                    </TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
        </React.Fragment>
      ),
    })}
  </form>
)

HolidayRequestForm.defaultProps = {
  periods: [],
}

HolidayRequestForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  valid: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  render: PropTypes.func.isRequired,
  periods: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    startOnPM: PropTypes.bool,
    endDate: PropTypes.string.isRequired,
    endOnPM: PropTypes.bool,
  })),
}

const HookedHolidayRequestForm = reduxForm({
  form: 'holidaysForm',
  validate,
  initialValues: {
    periods: [{
      _id: Date.now(),
      label: 'paidHolidays',
      startDate: moment().format('YYYY-MM-DD'),
      endDate: moment().format('YYYY-MM-DD'),
      endOnPM: true,
    }],
  },
  onSubmit: async (formData, dispatch, { onFormSubmit }) => {
    const { id, title, comment } = formData
    await onFormSubmit({
      id,
      title,
      comment,
      periods: formData.periods.map(formatPeriod),
    })
    dispatch(push('/holidays/me'))
  },
})(HolidayRequestForm)

export default connect(mapStateToProps)(HookedHolidayRequestForm)
