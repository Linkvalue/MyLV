import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import moment from 'moment'
import { Typography, withStyles } from 'material-ui'

import { calendarLabelsSelector, calendarExpectedDaysSelector } from '../calendar-selectors'

const mapStateToProps = state => ({
  user: state.auth.user,
  client: state.client,
  calendar: state.calendar,
  entries: state.worklog.entries,
  labels: calendarLabelsSelector(state),
  totalExpectedDays: calendarExpectedDaysSelector(state),
})

const styles = theme => ({
  printer: {
    display: 'none',
    position: 'relative',
    width: '100%',
    paddingTop: '70.70%',
  },
  printerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  printerTable: {
    marginTop: theme.spacing.unit * 6,
    borderCollapse: 'collapse',
    width: '100%',
  },
  printerSeparator: {
    height: '0.3rem',
    border: 'solid 1px #000000',
  },
  printerCell: {
    border: 'solid 1px #000000',
    textAlign: 'center',
    padding: '0.25rem',
  },
  printerSpacer: {
    height: theme.spacing.unit * 4,
  },
  printerFooter: {
    position: 'absolute',
    bottom: '2rem',
    left: '10%',
    width: '80%',
    textAlign: 'center',
  },
  '@media print': {
    printer: {
      display: 'block',
    },
  },
})

const Printer = ({
  classes, user, client, calendar, entries, labels, totalExpectedDays,
}) => {
  const days = moment(`${calendar.year}-${calendar.month}`).startOf('month').daysInMonth()
  const listDays = Array.from({ length: days }, (_, i) => (i >= 9 ? String(i + 1) : `0${i + 1}`))
  const dateRegExp = new RegExp(`^${calendar.year}-${calendar.month}`)

  return (
    <div className={classes.printer}>
      <div className={classes.printerContainer}>
        <Typography variant="headline" component="h2" gutterBottom>
          Feuille d'activité LinkValue - {moment(`${calendar.year}-${calendar.month}`).format('MMMM YYYY')}
        </Typography>
        <Typography variant="subheading" component="h5" gutterBottom>
          A renvoyer signé impérativement avant le 25 du mois en cours à admin@link-value.fr. Mettre votre responsable
          commercial en cc.
        </Typography>
        <Typography component="div">
          <table className={classes.printerTable}>
            <thead>
              <tr>
                <th className={classes.printerCell}>Activité</th>
                {listDays.map(x => <th key={x} className={classes.printerCell}>{x}</th>)}
                <th className={classes.printerCell}>Total</th>
              </tr>
            </thead>
            <tbody>
              {labels.reduce((acc, activity) => [
                ...acc,
                <tr key={`separator-${activity}`} className={classes.printerSeparator} />,
                <tr key={`${activity}-am`}>
                  <td className={classes.printerCell} rowSpan="2">{activity}</td>
                  {listDays.map(day => (
                    <td key={day} className={classes.printerCell}>
                      {entries[`${calendar.year}-${calendar.month}-${day}-am`] === activity ? 1 : 0}
                    </td>
                  ))}
                  <td className={classes.printerCell} rowSpan="2">
                    {Object.keys(entries).filter(i => entries[i] === activity && dateRegExp.test(i)).length / 2}
                  </td>
                </tr>,
                <tr key={`${activity}-pm`}>
                  {listDays.map(day => (
                    <td key={day} className={classes.printerCell}>
                      {entries[`${calendar.year}-${calendar.month}-${day}-pm`] === activity ? 1 : 0}
                    </td>
                  ))}
                </tr>,
              ], [])}
              <tr className={classes.printerSeparator} />
              <tr>
                <td colSpan={listDays.length - 9} />
                <td className={classes.printerCell} colSpan="10">Nombre de jour attendus :</td>
                <td className={classes.printerCell}>{totalExpectedDays}</td>
              </tr>
              <tr>
                <td className={classes.printerSpacer} />
              </tr>
              <tr>
                <td />
                <td colSpan="15">Nom : <b>{user.lastName}</b></td>
                <td colSpan="15">Nom du client : <b>{client.clientName}</b></td>
              </tr>
              <tr>
                <td />
                <td colSpan="15">Prénom : <b>{user.firstName}</b></td>
                <td colSpan="15">Adresse client : <b>{client.clientAddress}</b></td>
              </tr>
              <tr>
                <td />
                <td colSpan="15" />
                <td colSpan="15">Nom du responsable : <b>{client.managerName}</b></td>
              </tr>
              <tr>
                <td className={classes.printerSpacer} />
              </tr>
              <tr>
                <td />
                <td colSpan="15">Signature partner :</td>
                <td colSpan="10">Visa pour information :</td>
              </tr>
            </tbody>
          </table>
        </Typography>
        <Typography component="div" className={classes.printerFooter}>
          LinkValue – 108 rue des Dames, 75017 PARIS – www.link-value.fr<br />
          SAS au capital de 75 000 euros – RCS Paris B 803 833 748 – SIRET 80383374800012
          - TVA intracommunautaire FR67803833748
        </Typography>
      </div>
    </div>
  )
}

Printer.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default connect(mapStateToProps)(withStyles(styles)(Printer))
