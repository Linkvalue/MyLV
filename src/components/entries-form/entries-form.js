import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as worklogActions from '../../actions/worklog-actions'
import styles from './entries-form.scss'

const mapStateToProps = (state) => ({
  ...state.calendar,
  labels: state.worklog.labels
})

const mapDispatchToProps = (dispatch) => bindActionCreators(worklogActions, dispatch)

class EntriesForm extends React.Component {
  componentDidMount () {
    this.setState({label: 'production'})
  }

  render () {
    const {
      labels,
      fillMorning,
      fillAfternoon,
      fillDay,
      fillWeek,
      fillMonth,
      year,
      month,
      day
    } = this.props

    return (
      <div className={styles.entriesForm}>
        <div className={styles.buttonList}>
          <select
            name='entryLabel'
            onChange={(e) => this.setState({label: e.target.value})}>
            {Object.keys(labels).map((label) => <option key={label} value={label}>{label}</option>)}
          </select>
          <button
            className={styles.entryButton}
            onClick={() => fillMorning(`${year}-${month}-${day}-am`, this.state.label)}>
            Matinée
          </button>
          <button
            className={styles.entryButton}
            onClick={() => fillAfternoon(`${year}-${month}-${day}-pm`, this.state.label)}>
            Après-midi
          </button>
          <button
            className={styles.entryButton}
            onClick={() => fillDay(`${year}-${month}-${day}`, this.state.label)}>
            Journée
          </button>
          <button
            className={styles.entryButton}
            onClick={() => fillWeek(`${year}-${month}-${day}`, this.state.label)}>
            Semaine
          </button>
          <button
            className={styles.entryButton}
            onClick={() => fillMonth(`${year}-${month}`, this.state.label)}>
            Mois
          </button>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EntriesForm)
