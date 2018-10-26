import React from 'react'
import { Select, FormControl, InputLabel, MenuItem } from '@material-ui/core'

const WrappedSelectField = field => (
  <FormControl className={field.className}>
    <InputLabel>{field.label}</InputLabel>
    <Select
      inputProps={field.input}
      error={!!field.meta.error}
    >
      {Array.from(field.options.entries()).map(([key, value]) => <MenuItem key={key} value={key}>{value}</MenuItem>)}
    </Select>
  </FormControl>
)

export default WrappedSelectField
