
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
      <table className={styles.printerTable}>
        <thead>
          <tr>
            <th className={styles.printerCell}>Activité</th>
            {listDays.map((x) => <th key={x} className={styles.printerCell}>{x}</th>)}
            <th className={styles.printerCell}>Total</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(labels).map((activity, i) => (
            <tr key={`${activity}-${i}`}>
              <td className={styles.printerCell}>{activity}</td>
              {listDays.map((i) => (<td key={i} className={styles.printerCell}>{
                (entries[`${calendar.year}-${calendar.month}-${i}-am`] === activity ? 0.5 : 0) +
                (entries[`${calendar.year}-${calendar.month}-${i}-pm`] === activity ? 0.5 : 0)
              }</td>))}
              <td className={styles.printerCell}>
                {Object.keys(entries).filter((i) => entries[i] === activity).length / 2}
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan={listDays.length - 4}/>
            <td className={styles.printerCell} colSpan='5'>Nombre de jour attendus :</td>
            <td className={styles.printerCell}>{Object.keys(entries).length / 2}</td>
          </tr>
          <tr>
            <td/>
            <td colSpan='15'>Signature partner :</td>
            <td colSpan='5'>Signature client :</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default connect(mapStateToProps)(Printer)
