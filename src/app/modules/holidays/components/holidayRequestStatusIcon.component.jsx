import React from 'react'
import PropTypes from 'prop-types'
import { Icon, Tooltip } from 'material-ui'
import { Check, Clear, HourglassEmpty } from 'material-ui-icons'
import {
  HOLIDAY_REQUEST_REJECTED,
  HOLIDAY_REQUEST_APPROVED,
  HOLIDAY_REQUEST_PENDING,
} from '../../../../shared/holiday.constants'

const statusIcons = {
  [HOLIDAY_REQUEST_PENDING]: <HourglassEmpty />,
  [HOLIDAY_REQUEST_APPROVED]: <Check />,
  [HOLIDAY_REQUEST_REJECTED]: <Clear />,
}

const tooltipTexts = {
  [HOLIDAY_REQUEST_PENDING]: 'En attente de validation',
  [HOLIDAY_REQUEST_APPROVED]: 'Demande acceptée',
  [HOLIDAY_REQUEST_REJECTED]: 'Demande refusée',
}

const iconColors = {
  [HOLIDAY_REQUEST_PENDING]: 'inherit',
  [HOLIDAY_REQUEST_APPROVED]: 'primary',
  [HOLIDAY_REQUEST_REJECTED]: 'error',
}

const HolidayRequestStatusIcon = ({ status }) => (
  <Tooltip title={tooltipTexts[status]} placement="bottom">
    <Icon color={iconColors[status]}>
      {statusIcons[status]}
    </Icon>
  </Tooltip>
)

HolidayRequestStatusIcon.defaultProps = {
  status: HOLIDAY_REQUEST_PENDING,
}

HolidayRequestStatusIcon.propTypes = {
  status: PropTypes.string,
}

export default HolidayRequestStatusIcon
