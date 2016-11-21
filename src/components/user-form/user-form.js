import React from 'react'
import { routeActions } from 'redux-simple-router'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'

import TextField from '../textfield/textfield'
import styles from './user-form.scss'
import { userEntry } from '../../actions/user-actions'

const mapStateToProps = state => ({
  initialValues: state.user
})

const validate = ({ firstName, lastName, clientName, clientAddress }) => ({
  firstName: !firstName ? 'Obligatoire' : null,
  lastName: !lastName ? 'Obligatoire' : null,
  clientName: !clientName ? 'Obligatoire' : null,
  clientAddress: !clientAddress ? 'Obligatoire' : null
})

const UserForm = ({ handleSubmit, pristine, invalid }) => (
  <form className={styles.userForm} onSubmit={handleSubmit}>
    <div className={styles['mdl-card__title']}>
      <h2 className={styles['mdl-card__title-text']}>Informations partner / client</h2>
    </div>
    <div className={styles.userFormText}>
      <div className={styles.userFormGrid}>
        <div className={styles.userFormColumn}>
          <Field
            name='lastName'
            type='text'
            label='Nom'
            component={TextField} />
          <Field
            name='firstName'
            type='text'
            label='Prénom'
            component={TextField} />
        </div>
        <div className={styles.userFormColumn}>
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
        </div>
      </div>
    </div>
    <div className={styles.userFormActions}>
      <button
        className={styles.userFormSubmit}
        type='submit'
        disabled={pristine || invalid}>
        Enregistrer
      </button>
    </div>
  </form>
)

const HookedUserForm = reduxForm({
  form: 'userForm',
  validate,
  onSubmit: (formData, dispatch) => {
    dispatch(userEntry(formData))
    dispatch(routeActions.push('/'))
  }
})(UserForm)

export default connect(mapStateToProps)(HookedUserForm)
