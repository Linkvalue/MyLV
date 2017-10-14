import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import moment from 'moment'
import classNames from 'classnames'
import { Button, Card, CardActions, CardContent, Grid, IconButton, Typography, withStyles } from 'material-ui'
import { ChevronLeft, ChevronRight } from 'material-ui-icons'

import CalendarDay from './calendarDay.component'
import * as calendarActions from '../calendar-actions'
import * as worklogActions from '../worklog-actions'
import { hasPendingChangesSelector } from '../worklog-selectors'
import { calendarDaysSelector, calendarLabelsSelector } from '../calendar-selectors'
import { publicHolidays } from '../calendar-constants'

const weekDays = ['L', 'M', 'M', 'J', 'V', 'S', 'D']

const mapStateToProps = (state) => ({
  ...state.calendar,
  ...state.worklog,
  labelsInLegend: calendarLabelsSelector(state),
  weeks: calendarDaysSelector(state),
  hasPendingChanges: hasPendingChangesSelector(state)
})

const mapDispatchToProps = (dispatch) => bindActionCreators({...calendarActions, ...worklogActions}, dispatch)

const styles = theme => ({
  calendarContent: { position: 'relative' },
  calendarTitle: {
    textTransform: 'capitalize',
    textAlign: 'center'
  },
  calendarArrow: {
    position: 'absolute',
    top: theme.spacing.unit
  },
  calendarArrowLeft: { left: 0 },
  calendarArrowRight: { right: 0 },
  calendarBody: {
    width: '100%',
    borderCollapse: 'collapse',
    userSelect: 'none'
  },
  calendarCell: {
    position: 'relative',
    border: `solid 1px ${theme.palette.grey['200']}`,
    padding: '0',
    width: theme.spacing.unit * 10,
    height: theme.spacing.unit * 4,
    verticalAlign: 'middle',
    textAlign: 'center',
    cursor: 'pointer'
  },
  calendarCellEmpty: { cursor: 'auto' },
  calendarCellWeekend: { color: 'lightgrey' },
  calendarDayNumber: {
    position: 'absolute',
    top: theme.spacing.unit,
    left: theme.spacing.unit,
    fontSize: '0.8rem',
    zIndex: 2
  },
  legendColor: {
    display: 'inline-block',
    width: theme.spacing.unit * 2,
    height: theme.spacing.unit,
    margin: `0 ${theme.spacing.unit}px`
  }
})

class Calendar extends Component {
  componentWillMount () {
    this.props.getWorklog(this.props.year, this.props.month)
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.year !== nextProps.year || this.props.month !== nextProps.month) {
      this.props.getWorklog(nextProps.year, nextProps.month)
    }
  }

  render () {
    const {
      labels,
      entries,
      pending,
      year,
      month,
      day,
      setDate,
      emptyDay,
      labelsInLegend,
      weeks,
      saveWorklog,
      hasPendingChanges,
      classes
    } = this.props
    const m = moment(`${year}-${month}`, 'YYYY-MM')
    const calendarEntries = { ...entries, ...pending }

    const removeDayEntry = (e, d) => {
      e.preventDefault()
      emptyDay(`${year}-${month}-${`0${d}`.slice(-2)}`)
    }

    return (
      <Grid item md={8} xs={12}>
        <Card>
          <CardContent className={classes.calendarContent}>
            <IconButton
              className={`${classes.calendarArrow} ${classes.calendarArrowLeft}`}
              onClick={() => setDate(m.clone().subtract(1, 'month').format('YYYY-MM-DD'))}>
              <ChevronLeft />
            </IconButton>
            <Typography className={classes.calendarTitle} type='headline' component='h2' gutterBottom>
              {m.format('MMMM YYYY')}
            </Typography>
            <IconButton
              className={`${classes.calendarArrow} ${classes.calendarArrowRight}`}
              onClick={() => setDate(m.clone().add(1, 'month').format('YYYY-MM-DD'))}>
              <ChevronRight />
            </IconButton>
          </CardContent>
          <table className={classes.calendarBody}>
            <thead>
              <tr>
                {weekDays.map((l, i) => <th key={`${l}-${i}`}>{l}</th>)}
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
                      className={classNames(classes.calendarCell, {
                        [classes.calendarCellEmpty]: !d,
                        [classes.calendarCellWeekend]: i >= 5 || publicHolidays.has(`${month}-${d}`)
                      })}>
                      <span className={classes.calendarDayNumber}>{d && parseInt(d, 10)}</span>
                      {d && <CalendarDay
                        labelMorning={calendarEntries[`${year}-${month}-${d}-am`]}
                        labelAfternoon={calendarEntries[`${year}-${month}-${d}-pm`]}
                        selected={d === day}
                      />}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <CardContent>
            {labelsInLegend.map((label) => (
              <span key={label}>
                <i className={classes.legendColor} style={{ backgroundColor: labels[label] }} />
                {label}
              </span>
            ))}
          </CardContent>
          <CardActions>
            <Button dense color='primary' onClick={saveWorklog} disabled={!hasPendingChanges}>
              Enregistrer
            </Button>
          </CardActions>
        </Card>
      </Grid>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Calendar))