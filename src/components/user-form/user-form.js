import React from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'

import TextField from '../textfield/textfield'
import styles from './user-form.scss'
import { userEntry } from '../../actions/user-actions'

const mapStateToProps = (state) => {
  console.log(state.user)
  return ({
    initialValues: state.user
  })
}

const validate = ({ firstName, lastName }) => ({
  firstName: !firstName ? 'Obligatoire' : null,
  lastName: !lastName ? 'Obligatoire' : null
})

const UserForm = ({ handleSubmit, pristine, invalid }) => (
  <form className={styles.userForm} onSubmit={handleSubmit}>
    <div className={styles['mdl-card__title']}>
      <h2 className={styles['mdl-card__title-text']}>Informations partner</h2>
    </div>
    <div className={styles.userFormText}>
      <Field
        name='lastName'
        type='text'
        label='Nom'
        component={TextField}/>
      <Field
        name='firstName'
        type='text'
        label='Prénom'
        component={TextField}/>
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
  onSubmit: ({ firstName, lastName }, dispatch) => dispatch(userEntry(firstName, lastName))
})(UserForm)

export default connect(mapStateToProps)(HookedUserForm)
