import React from 'react'
import { FormControl, FormHelperText, Input, InputLabel } from 'material-ui'

const WrappedTextField = field => (
  <FormControl className={field.className} error={!!field.meta.error} fullWidth={field.fullWidth}>
    <InputLabel htmlFor={field.input.id}>{field.label}</InputLabel>
    <Input {...field.input} />
    <FormHelperText>{field.meta.error}</FormHelperText>
  </FormControl>
)

export default WrappedTextField
