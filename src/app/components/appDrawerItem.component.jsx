import React from 'react'
import { ListItem, ListItemIcon, ListItemText } from 'material-ui'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'

const AppDrawerItem = ({ to, text, icon, handleClick }) => (
  <ListItem button onClick={handleClick}>
    <ListItemIcon>
      {icon}
    </ListItemIcon>
    <ListItemText primary={text} />
  </ListItem>
)

const mapDispatchToProps = (dispatch, { to }) => ({ handleClick: () => dispatch(push(to)) })

export default connect(undefined, mapDispatchToProps)(AppDrawerItem)
