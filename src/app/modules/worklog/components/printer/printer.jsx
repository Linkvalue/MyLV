import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import { calendarLabelsSelector, calendarExpectedDaysSelector } from '../../calendar-selectors'
import styles from './printer.scss'

const mapStateToProps = (state) => ({
  user: state.auth.user,
  client: state.client,
  calendar: state.calendar,
  entries: state.worklog.entries,
  labels: calendarLabelsSelector(state),
  totalExpectedDays: calendarExpectedDaysSelector(state)
})

const Printer = ({ user, client, calendar, entries, labels, totalExpectedDays }) => {
  const days = moment(`${calendar.year}-${calendar.month}`).startOf('month').daysInMonth()
  const listDays = Array.from({length: days}, (_, i) => i >= 9 ? String(i + 1) : '0' + (i + 1))
  const dateRegExp = new RegExp(`^${calendar.year}-${calendar.month}`)

  return (
    <div className={styles.printer}>
      <h2>Feuille d'activité LinkValue - {moment(calendar.year + '-' + calendar.month).format('MMMM YYYY')}</h2>
      <h5>A renvoyer signé impérativement avant le 25 du mois en cours à admin@link-value.fr. Mettre votre responsable commercial en cc.</h5>
      <table className={styles.printerTable}>
        <thead>
          <tr>
            <th className={styles.printerCell}>Activité</th>
            {listDays.map((x) => <th key={x} className={styles.printerCell}>{x}</th>)}
            <th className={styles.printerCell}>Total</th>
          </tr>
        </thead>
        <tbody>
          {labels.reduce((acc, activity, i) => [
            ...acc,
            <tr key={`separator-${activity}`} className={styles.printerSeparator} />,
            <tr key={`${activity}-am`}>
              <td className={styles.printerCell} rowSpan='2'>{activity}</td>
              {listDays.map((i) => (<td key={i} className={styles.printerCell}>{
                entries[`${calendar.year}-${calendar.month}-${i}-am`] === activity ? 1 : 0
              }</td>))}
              <td className={styles.printerCell} rowSpan='2'>
                {Object.keys(entries).filter((i) => entries[i] === activity && dateRegExp.test(i)).length / 2}
              </td>
            </tr>,
            <tr key={`${activity}-pm`}>
              {listDays.map((i) => (<td key={i} className={styles.printerCell}>{
                entries[`${calendar.year}-${calendar.month}-${i}-pm`] === activity ? 1 : 0
              }</td>))}
            </tr>
          ], [])}
          <tr className={styles.printerSeparator} />
          <tr>
            <td colSpan={listDays.length - 9} />
            <td className={styles.printerCell} colSpan='10'>Nombre de jour attendus :</td>
            <td className={styles.printerCell}>{totalExpectedDays}</td>
          </tr>
          <tr>
            <td className={styles.printerSpacer} />
          </tr>
          <tr>
            <td />
            <td colSpan='15'>Nom : <b>{user.lastName}</b></td>
            <td colSpan='15'>Nom du client : <b>{client.clientName}</b></td>
          </tr>
          <tr>
            <td />
            <td colSpan='15'>Prénom : <b>{user.firstName}</b></td>
            <td colSpan='15'>Adresse client : <b>{client.clientAddress}</b></td>
          </tr>
          <tr>
            <td />
            <td colSpan='15' />
            <td colSpan='15'>Nom du responsable : <b>{client.managerName}</b></td>
          </tr>
          <tr>
            <td className={styles.printerSpacer} />
          </tr>
          <tr>
            <td />
            <td colSpan='15'>Signature partner :</td>
            <td colSpan='10'>Visa pour information :</td>
          </tr>
        </tbody>
      </table>
      <div className={styles.printerFooter}>
        LinkValue – 108 rue des Dames, 75017 PARIS – www.link-value.fr<br />
        SAS au capital de 75 000 euros – RCS Paris B 803 833 748 – SIRET 80383374800012 - TVA intracommunautaire FR67803833748
      </div>
    </div>
  )
}

export default connect(mapStateToProps)(Printer)
