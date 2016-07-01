import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import classNames from 'classnames'

import styles from './calendar.scss'

const mapStateToProps = (state) => ({
  ...state.calendar,
  entries: state.worklog.entries
})

const colors = {
  production: '#FFEEEE'
}

const Calendar = ({ entries, year, month, day, setDay }) => {
  const m = moment(`${year}-${month}`).startOf('month')
  let w
  let weeks = []

  for (let i = 1; i <= m.daysInMonth(); i++) {
    let d = m.date(i)
    if (!w || d.day() === 1) {
      w = (new Array(7)).fill(undefined)
      weeks.push(w)
    }
    w[(d.day() + 6) % 7] = d.date()
  }

  return (
    <table className={styles.calendar}>
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
              onClick={() => setDay && setDay(d)}
              className={classNames({
                [styles.cell]: true,
                [styles.selected]: `${d}` === day,
                [styles.weekend]: i >= 5
              })}>
              <span className={styles.day}>{d}</span>
              <div className={styles.labels}>
                <svg
                  className={styles.morning}
                  viewBox='0 0 50 50'
                  preserveAspectRatio='none'>
                  <path style={{fill: colors[entries[`${year}-${month}-${d}-am`]] || 'white'}} d='M0,0L0,50L50,0z'/>
                  <path style={{fill: colors[entries[`${year}-${month}-${d}-pm`]] || 'white'}} d='M0,50L50,50L50,0z'/>
                </svg>
              </div>
            </td>
          ))}
        </tr>
      ))}
      </tbody>
    </table>
  )
}

export default connect(mapStateToProps)(Calendar)
