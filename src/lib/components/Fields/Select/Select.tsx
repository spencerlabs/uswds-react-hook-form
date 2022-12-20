import { forwardRef } from 'react'

import { useFieldId } from '../../../hooks'
import { BaseFieldProps, FormGroup } from '../../FormGroup'

import Field, { SelectFieldProps } from './SelectField/SelectField'

interface SelectGroupProps
  extends Omit<SelectFieldProps, 'hint'>,
    Omit<BaseFieldProps, 'characterCount'> {}

const SelectComponent = forwardRef<HTMLSelectElement, SelectGroupProps>(
  ({ hint, id, label, ...rest }, ref) => {
    const fieldId = useFieldId(id)

    return (
      <FormGroup
        className="usa-form-group--select"
        fieldId={fieldId}
        label={label}
        hint={hint}
        name={rest.name}
      >
        <Field ref={ref} {...rest} id={fieldId} hint={hint ? true : false} />
      </FormGroup>
    )
  }
)

const Select = Object.assign(SelectComponent, { Field })

export default Select
