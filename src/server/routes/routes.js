const getAssets = require('./getAssets.route')
const getMe = require('./getMe.route')
const postAuth = require('./postAuth.route')

const postClient = require('./clients/postClient.route')
const postManager = require('./clients/postManager.route')

const putWorklog = require('./worklog/putWorklog.route')
const getWorklog = require('./worklog/getWorklog.route')
const postWorklogNotify = require('./worklog/postWorklogNotify.route')

const getLunches = require('./lunches/getLunches.route')
const postLunch = require('./lunches/postLunch.route')
const putLunch = require('./lunches/putLunch.route')
const getLunch = require('./lunches/getLunch.route')
const deleteLunch = require('./lunches/deleteLunch.route')

const getPartners = require('./partners/getPartners.route')

const postProofOfTransport = require('./proofOfTransports/postProofOfTransport.route')
const getProofOfTransportsZip = require('./proofOfTransports/getProofOfTransportsZip.route')

const postSubscription = require('./subscriptions/postSubscription.route')
const deleteSubscription = require('./subscriptions/deleteSubscription.route')

const postHoliday = require('./holidays/postHoliday.route')
const putHoliday = require('./holidays/putHoliday.route')
const deleteHoliday = require('./holidays/deleteHoliday.route')
const getHolidays = require('./holidays/getHolidays.route')
const getPersonalHolidays = require('./holidays/getPersonalHolidays.route')
const getHolidayDetails = require('./holidays/getHolidayDetails.route')

module.exports = [
  getAssets,
  getMe,
  postAuth,
  putWorklog,
  postClient,
  postManager,
  getWorklog,
  postWorklogNotify,
  getLunch,
  getLunches,
  postLunch,
  putLunch,
  deleteLunch,
  getPartners,
  postProofOfTransport,
  getProofOfTransportsZip,
  postSubscription,
  deleteSubscription,
  postHoliday,
  putHoliday,
  deleteHoliday,
  getHolidays,
  getPersonalHolidays,
  getHolidayDetails,
]
