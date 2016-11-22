import { reducer as form } from 'redux-form'
import { routeReducer as routing } from 'redux-simple-router'

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
