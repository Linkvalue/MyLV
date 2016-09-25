import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import moment from 'moment'
import classNames from 'classnames'

import CalendarDay from '../calendar-day/calendar-day'
import * as calendarActions from '../../actions/calendar-actions'
import * as worklogActions from '../../actions/worklog-actions'
import { publicHolidays } from '../../helpers'
import styles from './calendar.scss'

const mapStateToProps = (state) => ({
  ...state.calendar,
  ...state.worklog
})

const mapDispatchToProps = (dispatch) => bindActionCreators({...calendarActions, ...worklogActions}, dispatch)

const Calendar = ({ labels, entries, year, month, day, setDate, emptyDay }) => {
  let w
  const m = moment(`${year}-${month}`, 'YYYY-MM')
  const weeks = []
  const labelsInLegend = {}

  for (let i = 1; i <= m.daysInMonth(); i++) {
    let d = m.clone().date(i)
    if (!w || d.day() === 1) {
      w = Array.from({ length: 7 }, () => undefined)
      weeks.push(w)
    }
    w[(d.day() + 6) % 7] = `0${i}`.slice(-2)
    const morning = entries[`${year}-${month}-${`0${i}`.slice(-2)}-am`]
    if (morning) {
      labelsInLegend[morning] = true
    }
    const afternoon = entries[`${year}-${month}-${`0${i}`.slice(-2)}-pm`]
    if (afternoon) {
      labelsInLegend[afternoon] = true
    }
  }

  const removeDayEntry = (e, d) => {
    e.preventDefault()
    emptyDay(`${year}-${month}-${`0${d}`.slice(-2)}`)
  }

  return (
    <div className={styles.calendar}>
      <div className={styles.calendarTitle}>
        <button
          className={styles.calendarNavButton}
          onClick={() => setDate(m.clone().subtract(1, 'month').format('YYYY-MM-DD'))}>
          <svg viewBox='0 0 24 24' className={styles.calendarNavButtonIcon}>
            <use xlinkHref='icons/svg-sprite-navigation-symbol.svg#ic_chevron_left_24px'/>
          </svg>
        </button>
        <h2 className={styles.calendarCurrentMonth}>{m.format('MMMM YYYY')}</h2>
        <button
          className={styles.calendarNavButton}
          onClick={() => setDate(m.clone().add(1, 'month').format('YYYY-MM-DD'))}>
          <svg viewBox='0 0 24 24' className={styles.calendarNavButtonIcon}>
            <use xlinkHref='icons/svg-sprite-navigation-symbol.svg#ic_chevron_right_24px'/>
          </svg>
        </button>
      </div>
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
                onContextMenu={(e) => removeDayEntry(e, d)}
                onClick={() => d ? setDate(`${year}-${month}-${`0${d}`.slice(-2)}`) : null}
                className={classNames({
                  [styles.cell]: true,
                  [styles.empty]: !d,
                  [styles.weekend]: i >= 5 || publicHolidays.has(`${month}-${d}`)
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
      <div className={styles.legend}>
        {Object.keys(labelsInLegend).map((label) => (
          <span key={label}>
            <i className={styles.legendColor} style={{ backgroundColor: labels[label] }}/>
            {label}
          </span>
        ))}
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar)
