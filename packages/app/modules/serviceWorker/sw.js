/* eslint-disable global-require */

import { featureFlipping } from '@cracra/config/app'

if (featureFlipping.offlineMode) {
  require('./offline')
}

if (featureFlipping.pushNotifications) {
  require('./push')
}
