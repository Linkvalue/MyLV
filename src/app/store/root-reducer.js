import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import { routerReducer as routing } from 'react-router-redux'

import calendar from '../modules/worklog/calendar-reducer'
import worklog from '../modules/worklog/worklog-reducer'
import client from '../modules/client/client-reducer'
import settings from '../modules/settings/settings-reducer'
import auth from '../modules/auth/auth-reducer'
import display from '../modules/display/display.reducer'
import lunches from '../modules/lunches/lunches.reducer'
import partners from '../modules/partners/partners.reducer'

export const rootReducer = combineReducers({
  calendar,
  worklog,
  client,
  settings,
  auth,
  display,
  lunches,
  partners,

  // Vendor reducers
  form,
  routing
})
