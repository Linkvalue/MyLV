import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import {
  Button, IconButton, Paper, Radio, Switch, Table, TableBody, TableCell, TableFooter, TableHead, TableRow,
  withStyles,
} from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import moment from 'moment'
import { holidayLabels } from '@cracra/shared/calendar.constants'

import TextField from '../../../components/inputs/textField.component'

const styles = theme => ({
  periodsList: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  oneLineCell: {
    display: 'flex',
    alignItems: 'center',
  },
  am: {
    marginLeft: theme.spacing.unit,
  },
})

const RadioField = ({ input }) => <Radio {...input} />
const SwitchField = ({ input, value }) => <Switch {...input} value={value} />

export class PeriodsList extends React.Component {
  handleAddLineClick = () => this.props.fields.push({
    _id: Date.now(),
    label: 'paidHolidays',
    startDate: moment().format('YYYY-MM-DD'),
    endDate: moment().format('YYYY-MM-DD'),
    endOnPM: true,
  })

  render() {
    const { classes, fields } = this.props

    return (
      <Paper className={classes.periodsList}>
        <div className={classes.tableWrapper}>
          <Table>
            <TableHead>
              <TableRow>
                {Array.from(holidayLabels.keys()).map(key => (
                  <TableCell padding="checkbox" key={key}>{holidayLabels.get(key)}</TableCell>
                ))}
                <TableCell padding="checkbox">Date du premier jour d'absence</TableCell>
                <TableCell>A partir du</TableCell>
                <TableCell padding="checkbox">Date du dernier jour d'absence</TableCell>
                <TableCell>Jusqu'au</TableCell>
                <TableCell padding="checkbox" />
              </TableRow>
            </TableHead>
            <TableBody>
              {fields.map((period, index) => (
                <TableRow key={fields.get(index)._id}>
                  {Array.from(holidayLabels.keys()).map(key => (
                    <TableCell padding="checkbox" key={key}>
                      <Field name={`${period}.label`} type="radio" component={RadioField} value={key} />
                    </TableCell>
                  ))}
                  <TableCell padding="checkbox">
                    <Field name={`${period}.startDate`} type="date" component={TextField} outlined={false} />
                  </TableCell>
                  <TableCell>
                    <div className={classes.oneLineCell}>
                      <span className={classes.am}>Matin</span>
                      <Field name={`${period}.startOnPM`} value="startOnPM" type="checkbox" component={SwitchField} />
                      <span>Midi</span>
                    </div>
                  </TableCell>
                  <TableCell padding="checkbox">
                    <Field name={`${period}.endDate`} type="date" component={TextField} outlined={false} />
                  </TableCell>
                  <TableCell>
                    <div className={classes.oneLineCell}>
                      <span className={classes.am}>Midi</span>
                      <Field name={`${period}.endOnPM`} value="endOnPM" type="checkbox" component={SwitchField} />
                      <span>Soir</span>
                    </div>
                  </TableCell>
                  <TableCell padding="checkbox">
                    {index === 0 ? null : (
                      <IconButton color="secondary" onClick={() => fields.remove(index)}><Delete /></IconButton>
                    )}
                  </TableCell>
                </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
        <table className={classes.tableFooter}>
          <TableFooter>
            <TableRow>
              <TableCell>
                <Button color="primary" onClick={this.handleAddLineClick}>Ajouter une ligne</Button>
              </TableCell>
            </TableRow>
          </TableFooter>
        </table>
      </Paper>
    )
  }
}

PeriodsList.propTypes = {
  classes: PropTypes.shape({
    periodsList: PropTypes.string.isRequired,
  }).isRequired,
  fields: PropTypes.shape({
    push: PropTypes.func.isRequired,
    map: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
  }).isRequired,
}

export default withStyles(styles)(PeriodsList)
