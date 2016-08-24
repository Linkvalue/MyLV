import { reducer as form } from 'redux-form'

import calendar from './calendar-reducer'
import worklog from './worklog-reducer'
import user from './user-reducer'

export default {
  calendar,
  worklog,
  user,
  form
}
