import React from 'react'
import { Link } from 'react-router'
import classNames from 'classnames'
import { push } from 'react-router-redux'
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
          <Field
            name='managerName'
            type='text'
            label='Nom du responsable'
            component={TextField} />
        </div>
      </div>
    </div>
    <div className={styles.userFormActions}>
      <button
        className={classNames('mdl-button', 'mdl-js-button', 'mdl-js-ripple-effect')}
        type='submit'
        disabled={pristine || invalid}>
        Enregistrer
      </button>
      {invalid ? null : <Link className={classNames('mdl-button', 'mdl-js-button', 'mdl-js-ripple-effect')} to='/'>
        Retour à l'édition
      </Link>}
    </div>
  </form>
)

const HookedUserForm = reduxForm({
  form: 'userForm',
  validate,
  onSubmit: (formData, dispatch) => {
    dispatch(userEntry(formData))
    dispatch(push('/'))
  }
})(UserForm)

export default connect(mapStateToProps)(HookedUserForm)
