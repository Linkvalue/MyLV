import React from 'react'
import PropTypes from 'prop-types'

const Restricted = ({ roles, user, children }) =>
  ((user && roles.find(role => user.roles.indexOf(role) >= 0)) ? <React.Fragment>{children}</React.Fragment> : null)

Restricted.defaultProps = {
  user: null,
}

Restricted.propTypes = {
  roles: PropTypes.arrayOf(PropTypes.string).isRequired,
  user: PropTypes.shape({
    roles: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
  children: PropTypes.node.isRequired,
}

export default Restricted
