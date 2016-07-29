import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import moment from 'moment'
import classNames from 'classnames'

import CalendarDay from '../calendar-day/calendar-day'
import * as calendarActions from '../../actions/calendar-actions'
import styles from './calendar.scss'

const mapStateToProps = (state) => ({
  ...state.calendar,
  entries: state.worklog.entries
})

const mapDispatchToProps = (dispatch) => bindActionCreators(calendarActions, dispatch)

const Calendar = ({ entries, year, month, day, setDate }) => {
  const m = moment(`${year}-${month}`).startOf('month')
  let w
  let weeks = []

  for (let i = 1; i <= m.daysInMonth(); i++) {
    let d = m.date(i)
    if (!w || d.day() === 1) {
      w = (new Array(7)).fill(undefined)
      weeks.push(w)
    }
    w[(d.day() + 6) % 7] = `0${i}`.slice(-2)
  }

  return (
    <div className={styles.calendar}>
      <table className={styles.calendarBody}>
        <thead>
          <tr>
            {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((l, i) => <th key={`${l}-${i}`}>{l}</th>)}
          </tr>
        </thead>
        <tbody>
        {weeks.map((w) => (
          <tr key={w}>
            {w.map((d, i) => (
              <td
                key={`${d}-${i}`}
                onClick={() => i < 5 ? setDate(`${year}-${month}-${`0${d}`.slice(-2)}`) : null}
                className={classNames({
                  [styles.cell]: true,
                  [styles.empty]: !d,
                  [styles.weekend]: i >= 5
                })}>
                <span className={styles.day}>{d && parseInt(d, 10)}</span>
                {d && <CalendarDay
                  labelMorning={entries[`${year}-${month}-${d}-am`]}
                  labelAfternoon={entries[`${year}-${month}-${d}-pm`]}
                  selected={d === day}
                />}
              </td>
            ))}
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar)
