import { forwardRef } from 'react'

import { BaseFieldProps, FormGroup } from 'components/Form/FormGroup'
import { useFieldId } from 'lib/hooks'

import Field, { DatePickerFieldProps } from './DatePickerField/DatePickerField'

interface DatePickerGroupProps
  extends Omit<DatePickerFieldProps, 'hint'>,
    Omit<BaseFieldProps, 'characterCount'> {}

const DatePickerComponent = forwardRef<HTMLInputElement, DatePickerGroupProps>(
  ({ hint, id, label, ...rest }, ref) => {
    const fieldId = useFieldId(id)

    return (
      <FormGroup fieldId={fieldId} label={label} hint={hint} name={rest.name}>
        <Field ref={ref} {...rest} id={fieldId} hint={!!hint} />
      </FormGroup>
    )
  }
)

const DatePicker = Object.assign(DatePickerComponent, { Field })

export default DatePicker
