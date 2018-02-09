import React from 'react'
import { ListItem, ListItemIcon, ListItemText } from 'material-ui'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'

const mapDispatchToProps = (dispatch, { to }) => ({ handleClick: () => dispatch(push(to)) })

const AppDrawerItem = ({ text, icon, handleClick }) => (
  <ListItem button onClick={handleClick}>
    <ListItemIcon>
      {icon}
    </ListItemIcon>
    <ListItemText primary={text} />
  </ListItem>
)

export default connect(undefined, mapDispatchToProps)(AppDrawerItem)
