/* eslint-disable global-require */

import { featureFlipping } from '../../config'

if (featureFlipping.offlineMode) {
  require('./offline')
}

if (featureFlipping.pushNotifications) {
  require('./push')
}
