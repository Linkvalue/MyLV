const getAssets = require('./get-assets')
const getMe = require('./get-me')
const postAuth = require('./post-auth')
const putWorklog = require('./put-worklog')
const postClient = require('./post-client')
const postManager = require('./post-manager')

module.exports = [
  getAssets,
  getMe,
  postAuth,
  putWorklog,
  postClient,
  postManager
]
