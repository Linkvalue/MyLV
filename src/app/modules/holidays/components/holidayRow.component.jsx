import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Hidden, IconButton, Menu, MenuItem, TableCell, TableRow, Tooltip, withStyles } from 'material-ui'
import { Check, Clear, HourglassEmpty, MoreVert } from 'material-ui-icons'
import { Link } from 'react-router-dom'
import moment from 'moment'

import { holidayLabels } from '../../../../shared/calendar-constants'
import { getDaysForLabel } from '../hollidays.utils'

const styles = theme => ({
  holidayRow: {
    cursor: 'pointer',

    '&:hover $editHolidayButton': {
      display: 'block',
    },
  },
  holidayLabelCell: {
    position: 'relative',
    width: '60%',

    [theme.breakpoints.down('md')]: {
      width: 'auto',
    },
  },
  editHolidayButton: {
    display: 'none',
    position: 'absolute',
    top: 0,
    right: theme.spacing.unit,

    [theme.breakpoints.down('md')]: {
      display: 'block',
    },
  },
  dateCell: {
    whiteSpace: 'nowrap',
  },
})

const statusIcons = {
  pending: <HourglassEmpty />,
  validated: <Check />,
  rejected: <Clear />,
}

const tooltipTexts = {
  pending: 'En attente de validation',
  validated: 'Demande acceptée',
  rejected: 'Demande refusée',
}

export class HolidayRow extends Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      anchorEl: null,
      open: false,
    }
  }

  handleMenuButtonClick = (e) => {
    e.stopPropagation()
    this.setState({ open: true, anchorEl: e.currentTarget })
  }

  handleRequestClose = (e) => {
    e.stopPropagation()
    this.setState({ open: false })
  }

  handleHolidayDelete = (e) => {
    e.stopPropagation()
    this.props.onHolidayDelete(this.props.holiday.id)
  }

  render() {
    const {
      holiday,
      classes,
      onClick,
      disableMenu,
      displayPartnerName,
      partner,
    } = this.props

    let menu
    if (!disableMenu && holiday.status === 'pending') {
      menu = [
        <IconButton
          className={classes.editHolidayButton}
          onClick={this.handleMenuButtonClick}
          key="menu-btn"
        >
          <MoreVert />
        </IconButton>,
        <Menu
          id={`holiday-menu-${holiday.id}`}
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          onClose={this.handleRequestClose}
          key="menu-dropdown"
        >
          <MenuItem onClick={this.handleRequestClose} component={Link} to={`/holidays/${holiday.id}/edit`}>
            Éditer
          </MenuItem>
          <MenuItem onClick={this.handleHolidayDelete}>Supprimer</MenuItem>
        </Menu>,
      ]
    }

    return (
      <TableRow className={classes.holidayRow} hover onClick={onClick}>
        <TableCell className={classes.holidayLabelCell}>
          {displayPartnerName ? `${partner.firstName} ${partner.lastName}` : holiday.title}
          {menu}
        </TableCell>
        <TableCell className={classes.dateCell}>{moment(holiday.date).format('DD-MM-YYYY')}</TableCell>
        <Hidden mdDown>
          {Array.from(holidayLabels.keys()).map(label => (
            <TableCell numeric key={label}>{getDaysForLabel(holiday.periods, label, false)}</TableCell>
          ))}
          <TableCell>
            <Tooltip title={tooltipTexts[holiday.status || 'pending']} placement="bottom">
              {statusIcons[holiday.status || 'pending']}
            </Tooltip>
          </TableCell>
        </Hidden>
      </TableRow>
    )
  }
}

HolidayRow.defaultProps = {
  disableMenu: false,
  displayPartnerName: false,
  onClick: () => {},
  onHolidayDelete: () => {},
  partner: null,
}

HolidayRow.propTypes = {
  holiday: PropTypes.shape({
    id: PropTypes.string.isRequired,
    date: PropTypes.any.isRequired,
    periods: PropTypes.array.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
  partner: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
  }),
  classes: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  onHolidayDelete: PropTypes.func,
  disableMenu: PropTypes.bool,
  displayPartnerName: PropTypes.bool,
}

export default withStyles(styles)(HolidayRow)
