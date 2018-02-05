import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { Switch, Route } from 'react-router-dom'
import { MuiThemeProvider } from 'material-ui'

import App from './app.container'
import ClientPage from '../modules/client/pages/client.page'
import WorklogPage from '../modules/worklog/pages/worklog.page'
import AuthCallbackPage from '../modules/auth/pages/authCallbackPage'
import LoginPage from '../modules/auth/pages/login.page'
import LoginRequired from '../modules/auth/components/loginRequired.hoc'
import HolidaysPage from '../modules/holidays/pages/holidays.page'
import HolidayRequestPage from '../modules/holidays/pages/holidayRequest.page'
import LunchesPage from '../modules/lunches/pages/lunches.page'
import EditLunchPage from '../modules/lunches/pages/editLunch.page'
import NewLunchPage from '../modules/lunches/pages/newLunch.page'
import PartnersPage from '../modules/partners/pages/partners.page'
import TransportProofPage from '../modules/transport/pages/transportProofUpload.page'
import NotFound from '../components/notFound.component'
import theme from '../modules/display/theme'

export const Root = ({ store, history }) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <MuiThemeProvider theme={theme}>
        <App>
          <Switch>
            <Route exact path='/auth' component={AuthCallbackPage} />
            <Route exact path='/login' component={LoginPage} />
            <Route exact path='/client' component={LoginRequired(ClientPage)} />
            <Route exact path='/holidays/new' component={LoginRequired(HolidayRequestPage)} />
            <Route exact path='/holidays' component={LoginRequired(HolidaysPage)} />
            <Route exact path='/proof-upload' component={LoginRequired(TransportProofPage)} />
            <Route exact path='/lunches/new' component={LoginRequired(NewLunchPage)} />
            <Route exact path='/lunches/:id' component={LoginRequired(EditLunchPage)} />
            <Route exact path='/lunches' component={LoginRequired(LunchesPage)} />
            <Route exact path='/partners/:page?' component={LoginRequired(PartnersPage)} />
            <Route exact path='/' component={LoginRequired(WorklogPage)} />
            <Route component={NotFound} />
          </Switch>
        </App>
      </MuiThemeProvider>
    </ConnectedRouter>
  </Provider>
)

Root.propTypes = {
  history: PropTypes.object.isRequired,
  store: PropTypes.shape({
    subscribe: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    getState: PropTypes.func.isRequired,
  }).isRequired,
}
