/* eslint-disable react/no-array-index-key */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import moment from 'moment'
import classNames from 'classnames'
import { Card, CardContent, CircularProgress, IconButton, Typography, withStyles } from 'material-ui'
import { ChevronLeft, ChevronRight } from 'material-ui-icons'

import CalendarDay from './calendarDay.component'
import * as calendarActions from '../calendar-actions'
import * as worklogActions from '../worklog-actions'
import { calendarDaysSelector, calendarLabelsSelector } from '../calendar-selectors'
import { labels, labelColors } from '../../../../shared/calendar.constants'
import { isDayOff } from '../../../../shared/calendar.utils'

const weekDays = ['L', 'M', 'M', 'J', 'V', 'S', 'D']

const mapStateToProps = state => ({
  ...state.calendar,
  ...state.worklog,
  labelsInLegend: calendarLabelsSelector(state),
  weeks: calendarDaysSelector(state),
  isOffline: state.display.isOffline,
})

const mapDispatchToProps = dispatch => bindActionCreators({ ...calendarActions, ...worklogActions }, dispatch)

const styles = theme => ({
  calendar: {
    position: 'relative',
    marginBottom: theme.spacing.unit * 2,
  },
  calendarContent: { position: 'relative' },
  calendarTitle: {
    textTransform: 'capitalize',
    textAlign: 'center',
  },
  calendarArrow: {
    position: 'absolute',
    top: theme.spacing.unit,
  },
  calendarArrowLeft: { left: 0 },
  calendarArrowRight: { right: 0 },
  calendarBody: {
    width: '100%',
    borderCollapse: 'collapse',
    userSelect: 'none',
  },
  calendarCell: {
    position: 'relative',
    border: `solid 1px ${theme.palette.grey['200']}`,
    padding: '0',
    height: theme.spacing.unit * 10,
    verticalAlign: 'middle',
    textAlign: 'center',
    cursor: 'pointer',
  },
  calendarCellEmpty: { cursor: 'auto' },
  calendarCellWeekend: { color: 'lightgrey' },
  calendarDayNumber: {
    position: 'absolute',
    top: theme.spacing.unit,
    left: theme.spacing.unit,
    fontSize: '0.8rem',
    zIndex: 2,
  },
  legendColor: {
    display: 'inline-block',
    width: theme.spacing.unit * 2,
    height: theme.spacing.unit,
    margin: `0 ${theme.spacing.unit}px`,
  },
  calendarFooter: {
    minHeight: 58,
  },
  calendarLoaderWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(255, 255, 255, 0.8)',
    zIndex: 3,
  },
})

class Calendar extends Component {
  componentWillMount() {
    this.props.getWorklog(this.props.year, this.props.month, this.props.partnerId)
  }

  componentWillReceiveProps(nextProps) {
    const { year, month } = this.props
    if (year !== nextProps.year || month !== nextProps.month) {
      this.props.getWorklog(nextProps.year, nextProps.month, this.props.partnerId)
    }
  }

  render() {
    const {
      entries,
      pending,
      year,
      month,
      day,
      setDate,
      emptyDay,
      labelsInLegend,
      weeks,
      classes,
      isLoading,
    } = this.props
    const m = moment(`${year}-${month}`, 'YYYY-MM')
    const calendarEntries = { ...entries, ...pending }

    const removeDayEntry = (e, d) => {
      e.preventDefault()
      emptyDay(`${year}-${month}-${`0${d}`.slice(-2)}`)
    }

    return (
      <Card className={classes.calendar}>
        <CardContent className={classes.calendarContent}>
          <IconButton
            className={`${classes.calendarArrow} ${classes.calendarArrowLeft}`}
            onClick={() => setDate(m.clone().subtract(1, 'month').format('YYYY-MM-DD'))}
          >
            <ChevronLeft />
          </IconButton>
          <Typography className={classes.calendarTitle} type="headline" component="h2" gutterBottom>
            {m.format('MMMM YYYY')}
          </Typography>
          <IconButton
            className={`${classes.calendarArrow} ${classes.calendarArrowRight}`}
            onClick={() => setDate(m.clone().add(1, 'month').format('YYYY-MM-DD'))}
          >
            <ChevronRight />
          </IconButton>
        </CardContent>
        <table className={classes.calendarBody}>
          <thead>
            <tr>
              {weekDays.map((l, i) => <th key={i}>{l}</th>)}
            </tr>
          </thead>
          <tbody>
            {weeks.map(w => (
              <tr key={w}>
                {w.map((d, i) => {
                  const date = `${year}-${month}-${`0${d}`.slice(-2)}`
                  return (
                    <td
                      key={`${d}-${i}`}
                      onContextMenu={e => removeDayEntry(e, d)}
                      onClick={() => (d ? setDate(date) : null)}
                      className={classNames(classes.calendarCell, {
                        [classes.calendarCellEmpty]: !d,
                        [classes.calendarCellWeekend]: d && isDayOff(date),
                      })}
                    >
                      <span className={classes.calendarDayNumber}>{d && parseInt(d, 10)}</span>
                      {d && <CalendarDay
                        labelMorning={!isLoading && calendarEntries[`${year}-${month}-${d}-am`]}
                        labelAfternoon={!isLoading && calendarEntries[`${year}-${month}-${d}-pm`]}
                        selected={d === day}
                      />}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
        <CardContent classes={{ root: classes.calendarFooter }}>
          {labelsInLegend.map(label => (
            <span key={label}>
              <i className={classes.legendColor} style={{ backgroundColor: labelColors.get(label) }} />
              {labels.get(label)}
            </span>
          ))}
        </CardContent>
        {isLoading && <div className={classes.calendarLoaderWrapper}><CircularProgress /></div>}
      </Card>
    )
  }
}

Calendar.defaultProps = {
  entries: {},
  partnerId: null,
}

Calendar.propTypes = {
  getWorklog: PropTypes.func.isRequired,
  entries: PropTypes.object,
  pending: PropTypes.object.isRequired,
  year: PropTypes.string.isRequired,
  month: PropTypes.string.isRequired,
  day: PropTypes.string.isRequired,
  setDate: PropTypes.func.isRequired,
  emptyDay: PropTypes.func.isRequired,
  labelsInLegend: PropTypes.arrayOf(PropTypes.string).isRequired,
  weeks: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  classes: PropTypes.object.isRequired,
  partnerId: PropTypes.string,
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Calendar))
