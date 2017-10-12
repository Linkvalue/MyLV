import React from 'react'
import { Select, FormControl, InputLabel, MenuItem } from 'material-ui'

const WrappedSelectField = field => (
  <FormControl className={field.className}>
    <InputLabel>{field.label}</InputLabel>
    <Select
      {...field.input}
      error={field.meta.error}
    >
      {Object.keys(field.options).map(value => <MenuItem key={value} value={value}>{value}</MenuItem>)}
    </Select>
  </FormControl>
)

export default WrappedSelectField
