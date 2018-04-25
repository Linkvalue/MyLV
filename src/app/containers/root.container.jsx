import React from 'react'
import { hot } from 'react-hot-loader'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { Switch, Route } from 'react-router-dom'
import { MuiThemeProvider } from 'material-ui'

import ConnectedApp from './app.container'
import ClientPage from '../modules/client/pages/client.page'
import ConnectedWorklogPage from '../modules/worklog/pages/worklog.page'
import AuthCallbackPage from '../modules/auth/pages/authCallbackPage'
import LoginPage from '../modules/auth/pages/login.page'
import LoginRequired from '../modules/auth/components/loginRequired.hoc'
import ConnectedHolidayRequestPage from '../modules/holidays/pages/holidayRequest.page'
import ConnectedHolidayRequestEditPage from '../modules/holidays/pages/holidayRequestEdit.page'
import ConnectedHolidayRequestDetailsPage from '../modules/holidays/pages/holidayRequestDetails.page'
import ConnectedPersonalHolidaysPage from '../modules/holidays/pages/personalHolidays.page'
import ConnectedHolidaysPage from '../modules/holidays/pages/holidays.page'
import ConnectedPersonalLunchesPage from '../modules/lunches/pages/personalLunches.page'
import ConnectedEditLunchPage from '../modules/lunches/pages/editLunch.page'
import ConnectedNewLunchPage from '../modules/lunches/pages/newLunch.page'
import ConnectedPartnersPage from '../modules/partners/pages/partners.page'
import UploadTransportProofPage from '../modules/transport/pages/transportProofUpload.page'
import TransportProofsPage from '../modules/transport/pages/transportProofs.page'
import ConnectedSettingsPage from '../modules/settings/pages/settings.page'
import NotFound from '../components/notFound.component'
import theme from '../modules/display/theme'

const Root = ({ store, history }) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <MuiThemeProvider theme={theme}>
        <ConnectedApp>
          <Switch>
            <Route exact path="/auth" component={AuthCallbackPage} />
            <Route exact path="/login" component={LoginPage} />
            <LoginRequired>
              <Switch>
                <Route exact path="/settings" component={ConnectedSettingsPage} />
                <Route exact path="/client" component={ClientPage} />
                <Route exact path="/holidays/new" component={ConnectedHolidayRequestPage} />
                <Route exact path="/holidays/me" component={ConnectedPersonalHolidaysPage} />
                <Route exact path="/holidays/:id/edit" component={ConnectedHolidayRequestEditPage} />
                <Route exact path="/holidays/:id" component={ConnectedHolidayRequestDetailsPage} />
                <Route exact path="/holidays" component={ConnectedHolidaysPage} />
                <Route exact path="/transport/upload" component={UploadTransportProofPage} />
                <Route exact path="/transport" component={TransportProofsPage} />
                <Route exact path="/lunches/me" component={ConnectedPersonalLunchesPage} />
                <Route exact path="/lunches/new" component={ConnectedNewLunchPage} />
                <Route exact path="/lunches/:id" component={ConnectedEditLunchPage} />
                <Route exact path="/partners" component={ConnectedPartnersPage} />
                <Route exact path="/" component={ConnectedWorklogPage} />
                <Route component={NotFound} />
              </Switch>
            </LoginRequired>
          </Switch>
        </ConnectedApp>
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

export default hot(module)(Root)
