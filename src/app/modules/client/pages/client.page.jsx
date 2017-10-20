import React from 'react'
import { Link } from 'react-router-dom'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { Card, CardContent, CardActions, Button, Typography, withStyles } from 'material-ui'

import TextField from '../../../components/textField.component'
import { userEntry } from '../client-actions'

const mapStateToProps = state => ({
  initialValues: state.client,
})

const validate = ({ clientName, clientAddress }) => ({
  clientName: !clientName ? 'Obligatoire' : null,
  clientAddress: !clientAddress ? 'Obligatoire' : null,
})

const styles = theme => ({
  inputList: {
    marginTop: theme.spacing.unit,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
})

const ClientPage = ({ handleSubmit, pristine, invalid, classes }) => (
  <form onSubmit={handleSubmit}>
    <Card>
      <CardContent>
        <Typography type='headline' component='h2'>
          Informations client
        </Typography>
        <div className={classes.inputList}>
          <Field
            name='clientName'
            type='text'
            label='Nom du client'
            className={classes.textField}
            component={TextField} />
          <Field
            name='clientAddress'
            type='text'
            label='Adresse du client'
            className={classes.textField}
            component={TextField} />
          <Field
            name='managerName'
            type='text'
            label='Nom du responsable'
            className={classes.textField}
            component={TextField} />
        </div>
      </CardContent>
      <CardActions>
        <Button dense color='primary' type='submit' disabled={pristine || invalid}>Enregistrer</Button>
        <Button dense component={Link} to='/'>Retour à l'édition</Button>
      </CardActions>
    </Card>
  </form>
)

const HookedClientPage = reduxForm({
  form: 'clientForm',
  validate,
  onSubmit: (formData, dispatch) => {
    dispatch(userEntry(formData))
    dispatch(push('/'))
  },
})(ClientPage)

export default connect(mapStateToProps)(withStyles(styles)(HookedClientPage))
