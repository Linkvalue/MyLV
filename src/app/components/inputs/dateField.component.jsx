import React from 'react'
import { FormControl, FormHelperText, Input, InputLabel } from 'material-ui'

const WrappedDateField = field => (
  <FormControl className={field.className} error={!!field.meta.error} fullWidth={field.fullWidth}>
    {field.label && <InputLabel htmlFor={field.input.id}>{field.label}</InputLabel>}
    <Input type="date" {...field.input} autoFocus={field.autoFocus} />
    {field.meta.error && <FormHelperText>{field.meta.error}</FormHelperText>}
  </FormControl>
)

export default WrappedDateField
