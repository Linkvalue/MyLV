import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as worklogActions from '../../actions/worklog-actions'

const mapStateToProps = (state) => state.calendar

const mapDispatchToProps = (dispatch) => bindActionCreators(worklogActions, dispatch)

const EntriesForm = ({
  fillMorning,
  fillAfternoon,
  fillDay,
  fillWeek,
  fillMonth,
  year,
  month,
  week,
  day
}) => (
  <div>
    <select name='entryLabel'>
      {['production'].map((label) => <option>{label}</option>)}
    </select>
    <button onClick={() => fillMorning(`${year}-${month}-${day}-am`, 'production')}>
      Matinée
    </button>
    <button onClick={() => fillAfternoon(`${year}-${month}-${day}-pm`, 'production')}>
      Après-midi
    </button>
    <button onClick={() => fillDay(`${year}-${month}-${day}`, 'production')}>
      Journée
    </button>
    <button onClick={() => fillWeek(`${year}`, week, 'production')}>
      Semaine
    </button>
    <button onClick={() => fillMonth(`${year}-${month}`, 'production')}>
      Mois
    </button>
  </div>
)

export default connect(mapStateToProps, mapDispatchToProps)(EntriesForm)
