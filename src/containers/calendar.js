
import React from 'react'
import moment from 'moment'
import classNames from 'classnames'

export default ({month, day, setDay}) => {
  const m = moment(month).startOf('month')
  let w
  let weeks = []

  for (let i = 1; i <= m.daysInMonth(); i++) {
    let d = m.date(i)
    if (!w || d.day() === 0) {
      w = (new Array(7)).fill(undefined)
      weeks.push(w)
    }
    w[d.day()] = d.date()
  }
  return (
    <table className='calendar'>
      <thead>
        {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((l) => <td>{l}</td>)}
      </thead>
      <tbody>
        {weeks.map((w) => (
          <tr>
            {w.map((d, i) => <td
              onClick={() => setDay(d)}
              className={classNames({
                'cal-selected': d === day,
                'cal-we': i >= 5
              })}>
              {d}
            </td>)}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
