const getAssets = require('./get-assets')
const getMe = require('./get-me')
const postAuth = require('./post-auth')
const postWorklog = require('./post-worklog')

module.exports = [
  getAssets,
  getMe,
  postAuth,
  postWorklog
]
