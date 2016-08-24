import React from 'react'
import { reduxForm, Field } from 'redux-form'

import TextField from '../textfield/textfield'
import { addLabel } from '../../actions/worklog-actions'
import styles from './labels-form.scss'

const validate = ({ labelName, labelColor }) => ({
  labelName: !labelName ? 'Obligatoire' : null,
  labelColor: !labelColor ? 'Obligatoire' : (!/^#[a-fA-F0-9]{6}$/.test(labelColor) ? 'Code couleur invalide : #000000' : null)
})

const LabelsForm = ({ handleSubmit, pristine, invalid }) => (
  <form className={styles.labelsForm} onSubmit={handleSubmit}>
    <div className={styles['mdl-card__title']}>
      <h2 className={styles['mdl-card__title-text']}>Ajouter un label</h2>
    </div>
    <div className={styles.labelsFormText}>
      <Field
        name='labelName'
        type='text'
        label='Nom du label'
        component={TextField}/>
      <Field
        name='labelColor'
        type='text'
        label='Code couleur'
        component={TextField}/>
    </div>
    <div className={styles.labelsFormActions}>
      <button
        className={styles.labelsFormSubmit}
        type='submit'
        disabled={pristine || invalid}>
        Créer
      </button>
    </div>
  </form>
)

export default reduxForm({
  form: 'labelsForm',
  validate,
  onSubmit: ({labelName, labelColor}, dispatch) => dispatch(addLabel(labelName, labelColor))
})(LabelsForm)
