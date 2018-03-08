import React from 'react'
import PropTypes from 'prop-types'
import { Icon, Tooltip } from 'material-ui'
import { Check, Clear, HourglassEmpty } from 'material-ui-icons'

const statusIcons = {
  pending: <HourglassEmpty />,
  approved: <Check />,
  rejected: <Clear />,
}

const tooltipTexts = {
  pending: 'En attente de validation',
  approved: 'Demande acceptée',
  rejected: 'Demande refusée',
}

const iconColors = {
  pending: 'inherit',
  approved: 'primary',
  rejected: 'error',
}

const HolidayRequestStatusIcon = ({ status }) => (
  <Tooltip title={tooltipTexts[status]} placement="bottom">
    <Icon color={iconColors[status]}>
      {statusIcons[status]}
    </Icon>
  </Tooltip>
)

HolidayRequestStatusIcon.defaultProps = {
  status: 'pending',
}

HolidayRequestStatusIcon.propTypes = {
  status: PropTypes.string,
}

export default HolidayRequestStatusIcon
