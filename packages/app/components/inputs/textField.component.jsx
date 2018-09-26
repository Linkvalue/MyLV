import React from 'react'
import { FormControl, FormHelperText, Input, InputLabel } from '@material-ui/core'

const TextField = field => (
  <FormControl className={field.className} error={!!field.meta.error} fullWidth={field.fullWidth}>
    <InputLabel htmlFor={field.input.id}>{field.label}</InputLabel>
    <Input {...field.input} {...field.inputProps} />
    <FormHelperText>{field.meta.error || field.helperText}</FormHelperText>
  </FormControl>
)

export default TextField
