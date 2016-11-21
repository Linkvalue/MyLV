import React from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'

import Calendar from '../components/calendar/calendar'
import EntriesForm from '../components/entries-form/entries-form'
import Process from '../components/process/process'
import Printer from '../components/printer/printer'
import { canPrintSelector } from '../selectors/user-selectors'
import styles from './worklog-page.scss'

const mapStateToProps = state => ({
  canPrint: canPrintSelector(state)
})

const WorklogPage = () => (
  <div>
    <div className={classNames('mdl-grid', styles.mainGrid)}>
      <Process />
      <EntriesForm />
      <Calendar />
    </div>
    <Printer />
  </div>
)

export default connect(mapStateToProps)(WorklogPage)
