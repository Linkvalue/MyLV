import React from 'react'
import MenuItem from '@material-ui/core/MenuItem'

import TextField from './textField.component'

const SelectField = ({ options, ...props }) => (
  <TextField
    {...props}
    select
  >
    {Array.from(options.entries()).map(([key, value]) => (
      <MenuItem key={key} value={key}>
        {value}
      </MenuItem>
    ))}
  </TextField>
)

export default SelectField
