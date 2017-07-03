import React from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'

import { canPrintSelector } from '../../../client/client-selectors'
import Calendar from '../../components/calendar/calendar'
import EntriesForm from '../../components/entries-form/entries-form'
import Process from '../../components/process/process'
import Printer from '../../components/printer/printer'
import styles from './worklog-page.scss'

const mapStateToProps = state => ({
  shouldRemindProcess: state.settings.shouldRemindProcess,
  canPrint: canPrintSelector(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({ push }, dispatch)

const printCra = () => window.print()

class WorklogPage extends React.Component {
  componentDidMount () {
    if (!this.props.canPrint) {
      this.props.push('/client')
    }
  }

  render () {
    return (
      <div className={`mdl-layout__content ${styles.worklogPage}`}>
        <div className={classNames('mdl-grid', styles.mainGrid)}>
          {this.props.shouldRemindProcess ? <Process /> : null}
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WorklogPage)
