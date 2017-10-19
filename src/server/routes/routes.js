const getAssets = require('./getAssets.route')
const getMe = require('./getMe.route')
const postAuth = require('./postAuth.route')

const postClient = require('./clients/postClient.route')
const postManager = require('./clients/postManager.route')

const putWorklog = require('./worklog/putWorklog.route')
const getWorklog = require('./worklog/getWorklog.route')

const getLunches = require('./lunches/getLunches.route')
const postLunch = require('./lunches/postLunch.route')
const putLunch = require('./lunches/putLunch.route')
const getLunch = require('./lunches/getLunch.route')
const deleteLunch = require('./lunches/deleteLunch.route')

module.exports = [
  getAssets,
  getMe,
  postAuth,
  putWorklog,
  postClient,
  postManager,
  getWorklog,
  getLunch,
  getLunches,
  postLunch,
  putLunch,
  deleteLunch
]
