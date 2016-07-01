import React from 'react'
import moment from 'moment'
import classNames from 'classnames'

import styles from './calendar.scss'

export default ({ month, day, setDay }) => {
  const m = moment(month).startOf('month')
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
    <div className={styles.calendar}>
      <table>
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
                onClick={() => setDay(d)}
                className={classNames({
                  [styles.selected]: d === day,
                  [styles.we]: i >= 5
                })}>
                {d}
              </td>
            ))}
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  )
}
