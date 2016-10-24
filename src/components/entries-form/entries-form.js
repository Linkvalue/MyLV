import React from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import MaterialSelect from '../material-select/material-select'

import * as worklogActions from '../../actions/worklog-actions'
import styles from './entries-form.scss'

const validate = ({ label }) => ({
  label: !label ? 'Obligatoire' : null
})

const mapStateToProps = (state) => ({
  ...state.calendar,
  labels: state.worklog.labels,
  initialValues: {
    label: 'Production'
  }
})

const mapDispatchToProps = (dispatch) => bindActionCreators(worklogActions, dispatch)

const EntriesForm = ({
  labels,
  fillMorning,
  fillAfternoon,
  fillDay,
  fillWeek,
  fillMonth,
  year,
  month,
  day,
  handleSubmit
}) => (
  <form className={styles.entriesForm}>
    <div className={styles.entriesCard}>
      <div className={styles['mdl-card__title']}>
        <h2 className={styles['mdl-card__title-text']}>Imputation</h2>
      </div>
      <div className={styles.labelSelectorBox}>
        <Field
          options={labels}
          name='label'
          type='text'
          label='Choisissez un label'
          component={MaterialSelect}/>
      </div>
      <div className={styles.buttonList}>
        <button
          className={styles.entryButton}
          onClick={handleSubmit(({label}) => fillMorning(`${year}-${month}-${day}-am`, label))}>
          Matinée
        </button>
        <button
          className={styles.entryButton}
          onClick={handleSubmit(({label}) => fillAfternoon(`${year}-${month}-${day}-pm`, label))}>
          Après-midi
        </button>
        <button
          className={styles.entryButton}
          onClick={handleSubmit(({label}) => fillDay(`${year}-${month}-${day}`, label))}>
          Journée
        </button>
        <button
          className={styles.entryButton}
          onClick={handleSubmit(({label}) => fillWeek(`${year}-${month}-${day}`, label))}>
          Semaine
        </button>
        <button
          className={styles.entryButton}
          onClick={handleSubmit(({label}) => fillMonth(`${year}-${month}`, label))}>
          Mois
        </button>
      </div>
    </div>
  </form>
)

const HookedEntriesForm = reduxForm({
  form: 'entriesForm',
  validate
})(EntriesForm)

export default connect(mapStateToProps, mapDispatchToProps)(HookedEntriesForm)
