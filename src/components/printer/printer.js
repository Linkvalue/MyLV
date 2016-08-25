
import styles from './printer.scss'
import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

const mapStateToProps = (state) => {
  return {
    user: state.user,
    calendar: state.calendar,
    entries: state.worklog.entries
  }
}

const Printer = ({ user, calendar, entries }) => {
  const days = moment(`${calendar.year}-${calendar.month}`).startOf('month').daysInMonth()
  const listDays = Array.from({length: days}, (_, i) => i >= 9 ? String(i + 1) : '0' + (i + 1))

  const dateRegExp = new RegExp(`^${calendar.year}-${calendar.month}`)
  const labels = Object
    .keys(entries)
    .reduce((l, date) => entries[date] && dateRegExp.test(date) ? { ...l, [entries[date]]: true } : l, {})

  return (
    <div className={styles.printer}>
      <h1>Feuille d'activité LinkValue - {moment(calendar.year + '-' + calendar.month).format('MMMM YYYY')}</h1>
      <h5>A renvoyé signé impérativement avant le 25 du mois en cours à admin@link-value.fr. Mettre votre responsable commercial en cc.</h5>
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
                {Object.keys(entries).filter((i) => entries[i] === activity && dateRegExp.test(i)).length / 2}
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan={listDays.length - 9}/>
            <td className={styles.printerCell} colSpan='10'>Nombre de jour attendus :</td>
            <td className={styles.printerCell}>{Object.keys(entries).filter((i) => dateRegExp.test(i)).length / 2}</td>
          </tr>
          <tr>
            <td className={styles.printerSpacer}/>
          </tr>
          <tr>
            <td/>
            <td colSpan='15'>Nom : <b>{user.lastName}</b></td>
            <td colSpan='10'>Adresse client :</td>
          </tr>
          <tr>
            <td/>
            <td colSpan='15'>Prénom : <b>{user.firstName}</b></td>
            <td colSpan='10'>Responsable client :</td>
          </tr>
          <tr>
            <td className={styles.printerSpacer}/>
          </tr>
          <tr>
            <td/>
            <td colSpan='15'>Signature partner :</td>
            <td colSpan='10'>Visa pour information :</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default connect(mapStateToProps)(Printer)
