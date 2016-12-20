import React from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'

import Calendar from '../components/calendar/calendar'
import EntriesForm from '../components/entries-form/entries-form'
import Process from '../components/process/process'
import Printer from '../components/printer/printer'
import styles from './worklog-page.scss'

const mapStateToProps = state => ({
  shouldRemindProcess: state.settings.shouldRemindProcess
})

const printCra = () => window.print()

const WorklogPage = ({ shouldRemindProcess }) => (
  <div>
    <div className={classNames('mdl-grid', styles.mainGrid)}>
      {shouldRemindProcess ? <Process /> : null}
      <EntriesForm />
      <Calendar />
      <button
        onClick={printCra}
        className={`mdl-button mdl-js-button mdl-button--fab mdl-button--colored mdl-js-ripple-effect ${styles.printButton}`}>
        <i className='material-icons'>print</i>
      </button>
    </div>
    <Printer />
  </div>
)

export default connect(mapStateToProps)(WorklogPage)
