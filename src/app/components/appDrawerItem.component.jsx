import React from 'react'
import PropTypes from 'prop-types'
import { ListItem, ListItemIcon, ListItemText } from 'material-ui'
import { Link } from 'react-router-dom'

const AppDrawerItem = ({ text, icon, to }) => (
  <ListItem button component={Link} to={to}>
    <ListItemIcon>
      {icon}
    </ListItemIcon>
    <ListItemText primary={text} />
  </ListItem>
)

AppDrawerItem.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
}

export default AppDrawerItem
