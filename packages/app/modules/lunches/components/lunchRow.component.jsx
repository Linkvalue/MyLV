import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { IconButton, Menu, MenuItem, TableCell, TableRow, withStyles } from '@material-ui/core'
import { MoreVert } from '@material-ui/icons'
import { Link } from 'react-router-dom'
import moment from 'moment'

const styles = theme => ({
  lunchRow: {
    '&:hover $editLunchButton': {
      display: 'block',
    },
  },
  lunchLabelCell: {
    position: 'relative',
    width: '70%',
  },
  lunchDateCell: {
    whiteSpace: 'nowrap',
  },
  editLunchButton: {
    display: 'none',
    position: 'absolute',
    top: 0,
    right: theme.spacing.unit,

    [theme.breakpoints.down('md')]: {
      display: 'block',
    },
  },
})

export class LunchRow extends Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      anchorEl: null,
      open: false,
    }
  }

  handleMenuButtonClick = e => this.setState({ open: true, anchorEl: e.currentTarget })

  handleRequestClose = () => this.setState({ open: false })

  handleLunchDelete = () => this.props.onLunchDelete(this.props.lunch.id)

  render() {
    const { lunch, classes } = this.props

    return (
      <TableRow className={classes.lunchRow} hover>
        <TableCell className={classes.lunchLabelCell}>
          {lunch.label}
          <IconButton className={classes.editLunchButton} onClick={this.handleMenuButtonClick}>
            <MoreVert />
          </IconButton>
          <Menu
            id={`lunch-menu-${lunch.id}`}
            anchorEl={this.state.anchorEl}
            open={this.state.open}
            onClose={this.handleRequestClose}
          >
            <MenuItem onClick={this.handleRequestClose} component={Link} to={`/lunches/${lunch.id}`}>Éditer</MenuItem>
            <MenuItem onClick={this.handleLunchDelete}>Supprimer</MenuItem>
          </Menu>
        </TableCell>
        <TableCell className={classes.lunchDateCell} padding="dense">
          {moment(lunch.date).format('DD-MM-YYYY')}
        </TableCell>
        <TableCell numeric>{lunch.attendees.length + 1}</TableCell>
      </TableRow>
    )
  }
}

LunchRow.propTypes = {
  lunch: PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    date: PropTypes.any.isRequired,
    attendees: PropTypes.array.isRequired,
  }).isRequired,
  classes: PropTypes.object.isRequired,
  onLunchDelete: PropTypes.func.isRequired,
}

export default withStyles(styles)(LunchRow)
