import { reducer as form } from 'redux-form'
import { routerReducer as routing } from 'react-router-redux'

import calendar from './calendar-reducer'
import worklog from './worklog-reducer'
import user from './user-reducer'
import settings from './settings-reducer'

export default {
  calendar,
  worklog,
  user,
  settings,

  // Vendor reducers
  form,
  routing
}
