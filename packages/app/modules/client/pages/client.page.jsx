import React from 'react'
import { Link } from 'react-router-dom'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { Card, CardContent, CardActions, Button, Typography } from '@material-ui/core'
import { Helmet } from 'react-helmet'

import { appName } from '@cracra/config/app'
import TextField from '../../../components/inputs/textField.component'
import { userEntry } from '../client-actions'

const mapStateToProps = state => ({
  initialValues: state.client,
})

const validate = ({ clientName, clientAddress }) => ({
  clientName: !clientName ? 'Obligatoire' : null,
  clientAddress: !clientAddress ? 'Obligatoire' : null,
})

const ClientPage = ({ handleSubmit, pristine, invalid }) => (
  <form onSubmit={handleSubmit}>
    <Helmet>
      <title>Client | {appName}</title>
    </Helmet>
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          Informations client
        </Typography>
        <Field
          name="clientName"
          type="text"
          label="Nom du client"
          fullWidth
          component={TextField}
        />
        <Field
          name="clientAddress"
          type="text"
          label="Adresse du client"
          fullWidth
          component={TextField}
        />
        <Field
          name="managerName"
          type="text"
          label="Nom du responsable"
          fullWidth
          component={TextField}
        />
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" type="submit" disabled={pristine || invalid}>Enregistrer</Button>
        <Button size="small" component={Link} to="/">Retour à l'édition</Button>
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

export default connect(mapStateToProps)(HookedClientPage)
