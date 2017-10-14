import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm, Field, FieldArray } from 'redux-form'
import { push } from 'react-router-redux'
import { Grid, withStyles } from 'material-ui'
import moment from 'moment'

import TextField from '../../../components/textField.component'
import DateField from '../../../components/dateField.component'
import PartnerList from '../../../components/partnerList.component'

const validate = ({ label, date, attendants }) => {
  return {
    label: !label ? 'Obligatoire' : null,
    date: !date ? 'Obligatoire' : null,
    attendants: attendants.length === 0 ? { _error: 'Vous devez saisir au moins 1 participant' } : null
  }
}

const styles = () => ({
  lunchForm: {
    maxWidth: 800,
    margin: '0 auto'
  },
  lunchInput: {
    width: 300
  }
})

const LunchForm = ({ handleSubmit, render, classes, valid, pristine }) => (
  <form className={classes.lunchForm} onSubmit={handleSubmit}>
    {render({
      valid,
      pristine,
      children: (
        <Grid container>
          <Grid item md={6} xs={12}>
            <Field
              name='label'
              type='text'
              label='Intitulé'
              fullWidth
              component={TextField}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <Field
              name='date'
              type='text'
              label='Date'
              fullWidth
              component={DateField}
            />
          </Grid>
          <Grid item xs={12}>
            <FieldArray name='attendants' component={PartnerList} />
          </Grid>
        </Grid>
      )
    })}
  </form>
)

LunchForm.propTypes = {
  valid: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  render: PropTypes.func.isRequired
}

const HookedLunchForm = reduxForm({
  form: 'lunchForm',
  validate,
  onSubmit: (formData, dispatch, { onFormSubmit }) => {
    console.log(moment(formData.date, 'DD/MM/YYYY').toISOString())
    return onFormSubmit({ ...formData, date: moment(formData.date, 'DD/MM/YYYY').toISOString() })
      .then(() => dispatch(push('/lunches')))
  }
})(LunchForm)

export default withStyles(styles)(HookedLunchForm)
