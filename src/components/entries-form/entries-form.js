import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import classNames from 'classnames'

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
        <div className={styles['mdl-card__title']}>
          <h2 className={styles['mdl-card__title-text']}>Editer</h2>
        </div>
        <div className={styles.buttonList}>
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
        <div className={styles.buttonList}>
          {Object.keys(labels).map((label) => (
            <button
              key={label}
              className={classNames({
                [styles.entryButton]: label !== (this.state && this.state.label),
                [styles.entryButtonSelected]: label === (this.state && this.state.label)
              })}
              onClick={() => this.setState({label})}>
              {label}
            </button>
          ))}
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EntriesForm)
