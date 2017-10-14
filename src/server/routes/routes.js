const getAssets = require('./get-assets')
const getMe = require('./get-me')
const postAuth = require('./post-auth')
const putWorklog = require('./put-worklog')
const postClient = require('./post-client')
const postManager = require('./post-manager')
const getWorklog = require('./get-worklog')

const getLunches = require('./lunches/getLunches.route')
const postLunch = require('./lunches/postLunch.route')
const putLunch = require('./lunches/putLunch.route')
const getLunch = require('./lunches/getLunch.route')

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
  putLunch
]
