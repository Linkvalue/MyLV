import React from 'react'
import PropTypes from 'prop-types'
import MuiTextField from '@material-ui/core/TextField'

const TextField = ({
  className,
  input,
  meta,
  margin,
  type,
  helperText,
  outlined,
  ...props
}) => (
  <MuiTextField
    className={className}
    fullWidth
    error={meta && !!meta.error && meta.touched}
    helperText={(meta && meta.touched && meta.error) || helperText || ''}
    variant={outlined ? 'outlined' : 'standard'}
    type={type}
    margin={margin}
    InputLabelProps={{ shrink: type === 'date' ? true : undefined }}
    {...props}
    {...input}
  />
)

TextField.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  input: PropTypes.shape({
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
  }).isRequired,
  meta: PropTypes.shape({
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    touched: PropTypes.bool,
  }).isRequired,
  margin: PropTypes.string,
  outlined: PropTypes.bool,
  helperText: PropTypes.node,
}

TextField.defaultProps = {
  className: null,
  type: 'text',
  helperText: '',
  margin: 'dense',
  outlined: true,
}

export default TextField
