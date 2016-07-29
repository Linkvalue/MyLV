
import styles from './printer.scss'
import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    calendar: state.calendar,
    entries: state.worklog.entries
  }
}

const Printer = ({ user, calendar, entries }) => {
  const days = moment(calendar).daysInMonth()
  const listDays = Array.from(new Array(days), (_, i) => i >= 9 ? String(i + 1) : '0' + (i + 1))

  const labels = {}
  for (let i in entries) {
    labels[entries[i]] = true
  }

  return (
    <div className={styles.printer}>
      <h1>Feuille d'activité LinkValue - {moment(calendar.year + '-' + calendar.month).format('MMMM YYYY')}</h1>
      <h2>Partner: {user.firstName} {user.lastName}</h2>
      <table>
        <thead>
          <td>Activité</td>
          {listDays.map((x) => <td>{x}</td>)}
        </thead>
        <tbody>
          {Object.keys(labels).map((activity) => (
            <tr>
              <td>{activity}</td>
              {listDays.map((i) => <td>{
                (entries[`${calendar.year}-${calendar.month}-${i}-am`] === activity ? 0.5 : 0) +
                (entries[`${calendar.year}-${calendar.month}-${i}-pm`] === activity ? 0.5 : 0)
              }</td>)}
              <td>Total: {Object.keys(entries).filter((i) => entries[i] === activity).length / 2}</td>
            </tr>
          ))}
        </tbody>
      </table>
      Nombre de jour attendus : {Object.keys(entries).length / 2}
    </div>
  )
}

export default connect(mapStateToProps)(Printer)
