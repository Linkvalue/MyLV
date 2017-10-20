const Boom = require('boom')

function hasRole (roles) {
  return (req, res) => {
    const finalRoles = typeof roles === 'string' ? [roles] : roles
    if (req.auth.credentials && finalRoles.some(role => req.auth.credentials.roles.indexOf(role) >= 0)) {
      res.continue()
    } else {
      res(Boom.forbidden())
    }
  }
}

module.exports = hasRole
