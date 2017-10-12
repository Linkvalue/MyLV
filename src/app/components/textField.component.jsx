import React from 'react'
import { TextField } from 'material-ui'

const WrappedTextField = field => (
  <TextField
    {...field.input}
    className={field.className}
    label={field.label}
    error={field.meta.error}
  />
)

export default WrappedTextField
