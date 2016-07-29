import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'

import styles from './calendar-day.scss'

const mapStateToProps = (state) => ({ labels: state.worklog.labels })

const CalendarDay = ({labels, labelMorning, labelAfternoon, selected}) => (
  <div className={styles.calendarDay}>
    <svg
      className={classNames({
        [styles.calendarDayFill]: true,
        [styles.selected]: selected
      })}
      viewBox='0 0 50 50'
      preserveAspectRatio='none'>
      <path style={{fill: labels[labelMorning] || 'white'}} d='M0,0L0,50L50,0z'/>
      <path style={{fill: labels[labelAfternoon] || 'white'}} d='M0,50L50,50L50,0z'/>
    </svg>
  </div>
)

export default connect(mapStateToProps)(CalendarDay)
