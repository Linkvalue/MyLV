import React from 'react'
import PropTypes from 'prop-types'
import { Button, Card, CardActions, CardContent, Grid, Typography, withStyles } from 'material-ui'
import { Field, reduxForm } from 'redux-form'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import moment from 'moment'

import DateField from '../../../components/inputs/dateField.component'
import { postTransportProof, setExpirationDateToCurrentMonth } from '../transport.actions'
import FileField from '../../../components/inputs/fileField.component'

const mapDispatchToProps = dispatch => bindActionCreators({
  setExpirationDateToCurrentMonth,
  postTransportProof,
}, dispatch)

const validate = ({ file, expirationDate, startingDate }) => ({
  startingDate: !startingDate || /\s/.test(startingDate) ? 'Obligatoire' : null,
  expirationDate: !expirationDate || /\s/.test(expirationDate) ? 'Obligatoire' : null,
  file: !file ? 'Obligatoire' : null,
})

const styles = theme => ({
  uploadButtonWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  uploadInput: {
    display: 'none',
  },
})

export const TransportProofPage = ({ classes, valid, handleSubmit, ...actions }) => (
  <form onSubmit={handleSubmit}>
    <Card>
      <CardContent>
        <Grid container>
          <Grid item xs={12}>
            <Typography type='headline' component='h2' gutterBottom>
              Uploader un jsutificatif de titre de transport
            </Typography>
            <Typography gutterBottom>
              Ce justificatif te permettra d'être remboursé pour votre titre de transport, merci donc de le fournir avant
              le 25 du mois. Renseignez aussi la date d'expiration du justificatif afin d'être rappellé automatiquement
              lorsque celui-ci arrive à expiration.
            </Typography>
          </Grid>
          <Grid item md={4} xs={12}>
            <Field
              name='startingDate'
              type='text'
              label='Date de début de validité'
              fullWidth
              autoFocus
              component={DateField}
            />
          </Grid>
          <Grid item md={4} xs={12}>
            <Field
              name='expirationDate'
              type='text'
              label="Date d'expiration"
              fullWidth
              component={DateField}
            />
          </Grid>
          <Grid item md={4} xs={12}>
            <div className={classes.uploadButtonWrapper}>
              <Button color='primary' onClick={actions.setExpirationDateToCurrentMonth}>Valide pour ce mois</Button>
            </div>
          </Grid>
          <Grid item xs={12}>
            <Field
              name='file'
              accept='jpg,jpeg,JPG,JPEG,pdf,PDF,png,PNG'
              label='Choisir un fichier'
              component={FileField}
            />
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button dense color='primary' type='submit' disabled={!valid}>Upload</Button>
      </CardActions>
    </Card>
  </form>
)

TransportProofPage.propTypes = {
  classes: PropTypes.object.isRequired,
  valid: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  setExpirationDateToCurrentMonth: PropTypes.func.isRequired,
}

const HookedTransportProofPage = reduxForm({
  form: 'transportProofUploadForm',
  validate,
  onSubmit: ({ file, expirationDate, startingDate }, dispatch, { postTransportProof }) => {
    const multipartFormData = new window.FormData()

    multipartFormData.append('file', file[0])
    multipartFormData.append('startingDate', moment(startingDate, 'DD/MM/YYYY').toISOString())
    multipartFormData.append('expirationDate', moment(expirationDate, 'DD/MM/YYYY').toISOString())

    postTransportProof(multipartFormData)
  },
})(withStyles(styles)(TransportProofPage))

export default connect(undefined, mapDispatchToProps)(HookedTransportProofPage)
