import React from 'react'
import { Link } from 'react-router'
import classNames from 'classnames'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'

import TextField from '../../../../components/textfield/textfield'
import styles from './client-form.scss'
import { userEntry } from '../../client-actions'

const mapStateToProps = state => ({
  initialValues: state.user
})

const validate = ({ clientName, clientAddress }) => ({
  clientName: !clientName ? 'Obligatoire' : null,
  clientAddress: !clientAddress ? 'Obligatoire' : null
})

const ClientForm = ({ handleSubmit, pristine, invalid }) => (
  <form className={styles.clientForm} onSubmit={handleSubmit}>
    <div className={styles['mdl-card__title']}>
      <h2 className={styles['mdl-card__title-text']}>Informations client</h2>
    </div>
    <div className={styles.clientFormText}>
      <div className={styles.clientFormGrid}>
        <div className={styles.clientFormColumn}>
          <Field
            name='clientName'
            type='text'
            label='Nom du client'
            component={TextField} />
          <Field
            name='clientAddress'
            type='text'
            label='Adresse du client'
            component={TextField} />
          <Field
            name='managerName'
            type='text'
            label='Nom du responsable'
            component={TextField} />
        </div>
      </div>
    </div>
    <div className={styles.clientFormActions}>
      <button
        className={classNames('mdl-button', 'mdl-js-button', 'mdl-js-ripple-effect')}
        type='submit'
        disabled={pristine || invalid}>
        Enregistrer
      </button>
      <Link className={classNames('mdl-button', 'mdl-js-button', 'mdl-js-ripple-effect')} to='/'>
        Retour à l'édition
      </Link>
    </div>
  </form>
)

const HookedClientForm = reduxForm({
  form: 'clientForm',
  validate,
  onSubmit: (formData, dispatch) => {
    dispatch(userEntry(formData))
    dispatch(push('/'))
  }
})(ClientForm)

export default connect(mapStateToProps)(HookedClientForm)
