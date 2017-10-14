import React from 'react'
import MaskedInput from 'react-text-mask'
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe'
import { FormControl, FormHelperText, Input, InputLabel } from 'material-ui'

const autoCorrectedDatePipe = createAutoCorrectedDatePipe('dd/mm/yyyy')

const TextMaskCustom = props => {
  return (
    <MaskedInput
      {...props}
      mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
      placeholderChar={'\u2000'}
      showMask
      pipe={autoCorrectedDatePipe}
    />
  )
}

const WrappedDateField = field => (
  <FormControl className={field.className} error={!!field.meta.error} fullWidth={field.fullWidth}>
    <InputLabel htmlFor={field.input.id}>{field.label}</InputLabel>
    <Input inputComponent={TextMaskCustom} {...field.input} />
    <FormHelperText>{field.meta.error}</FormHelperText>
  </FormControl>
)

export default WrappedDateField
